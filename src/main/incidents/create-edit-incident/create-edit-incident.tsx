import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Incident } from '../../../models/incident';
import { useInput } from '../../../hooks/useInput';
import { InputValidations } from '../../../models/inputValidation';
import { SharedContext } from '../../../context/shared-context';

export const CreateEditIncident = () => {

  const navigate = useNavigate();
  const ctx = useContext(SharedContext);
  const location = useLocation();
  const [incident, setIncident] = useState<Incident>(new Incident());
  const [incidentErrors, setIncidentErrors] = useState<InputValidations[]>([
    { name: 'number', isValid: false, isTouched: false, errorMessages: ['Incident Number is required'] },
    { name: 'caller', isValid: false, isTouched: false, errorMessages: ['Caller is required'] },
    { name: 'description', isValid: false, isTouched: false, errorMessages: ['Description is required'] },
  ]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentValues, setCurrentValues] = useState<{ name: string, value: string }>({ name: '', value: '' });
  const { v4: uuidv4 } = require('uuid');

  const state = [
    { id: '1', value: 'New' },
    { id: '2', value: 'In progress' },
    { id: '3', value: 'Resolved' },
    { id: '4', value: 'Closed' }
  ];

  const priority = [
    { id: '1', value: 'Critical' },
    { id: '2', value: 'High' },
    { id: '3', value: 'Medium' },
    { id: '4', value: 'Low' }
  ];

  console.log('ctx', ctx.data);
  

  useEffect(() => {
    let newIncidentNumber: string;
    const incNumber = location.state ? location.state.incidentNumber ? location.state.incidentNumber : 0 : 0;
    let slicedStringNumber = incNumber.slice(3, incNumber.length);
    const firstIndex = incNumber.startsWith('0', 3);
    if (firstIndex) {
      slicedStringNumber = (1).toString() + slicedStringNumber;
      const newIncNumber = parseInt(slicedStringNumber) + 1;
      newIncidentNumber = 'INC' + newIncNumber.toString().slice(1, newIncNumber.toString().length);
    } else {
      const newIncNumber = parseInt(slicedStringNumber) + 1;
      newIncidentNumber = 'INC' + newIncNumber;
    }
    setIncident({ ...incident, number: newIncidentNumber, state: state[0].value, priority: priority[priority.length - 1].value });
    const errros = incidentErrors.map(x => ({ ...x, isValid: x.name === 'number' ? true : false }));
    setIncidentErrors(errros);
    console.log('data', ctx.data);
    
  }, []);

  function changeHandler(event: any) {
    const { name, value } = event.target;
    setIncident((prev) => ({ ...prev, [name]: value.trim() }));
    setCurrentValues({ name: name, value: value.trim() });
  }

  useEffect(() => {
    const errorCheckName = incidentErrors.find(x => x.name === currentValues.name)?.name
    if (errorCheckName) {
      const errors = incidentErrors.map(x => ({
        ...x,
        isTouched: x.name === currentValues.name ? true : x.isTouched,
        isValid: x.name === currentValues.name ? currentValues.value.length > 0 ? true : false : x.isValid
      }));
      setIncidentErrors(errors);
    }
  }, [currentValues])

  useEffect(() => {
    setIsSubmit(!(incidentErrors.filter(x => !x.isValid).length === 0));
  }, [incidentErrors])

  function back(event: any) {
    event.preventDefault();
    navigate(-1);
  }

  function submit(event: any) {
    event.preventDefault();
    const data = { ...incident, id: uuidv4() };
    const isValidLength = incidentErrors.filter(x => !x.isValid).length;
    setIncidentErrors(incidentErrors.map(x => ({ ...x, isTouched: true })));
    if (isValidLength === 0) {
      createIncident(data);
      
      setIncident(new Incident());
      navigate(-1);
    } else {
      // navigate(-1);
    }
  }

  // APIs
  const createIncident = useCallback(async (data: any) => {
    const response = await fetch('http://localhost:3005/incidents/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseJson = await response.json();
    console.log('respose', responseJson);
  }, []);



  return (
    <div>
      <form onSubmit={submit}>
        <div className="d-grid gap-2 d-md-flex justify-content-between my-3">
          <button className="btn btn-outline-primary" type="button" onClick={back}>Back</button>
          <button className={`btn btn-primary`}
            type="submit">{location.state.id ? 'Update' : 'Submit'}</button>
        </div>
        <div className="container-fluid">
          <div className="row mb-md-2">
            <div className="col-md-5">
              <div className="row">
                <div className="col-md text-end">
                  <label htmlFor="number" className='class="form-label"'><span className='text-danger'>*</span> Incident Number</label>
                </div>
                <div className="col-md">
                  <input type="text" className={`form-control form-control-sm ${!incidentErrors[0].isValid && incidentErrors[0].isTouched ? 'is-invalid' : ''}`}
                    disabled value={incident.number} name="number" id="number" onChange={changeHandler} />
                  {(!incidentErrors[0].isValid && incidentErrors[0].isTouched) && <div className='invalid-feedback'>{incidentErrors[0].errorMessages[0]}</div>}
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="row">
                <div className="col-md text-end">
                  <label htmlFor="state" className='class="form-label"'>State</label>
                </div>
                <div className="col-md">
                  <select className="form-select form-select-sm" value={incident.state} name="state" aria-label="state" id='state'
                    onChange={changeHandler} >
                    {state.map(state => (
                      <option value={state.value} id={state.id} key={state.id}>{state.value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-md-2">
            <div className="col-md-5">
              <div className="row">
                <div className="col-md text-end">
                  <label htmlFor="caller" className='class="form-label"'><span className='text-danger'>*</span> Caller</label>
                </div>
                <div className="col-md">
                  <input type="text" className={`form-control form-control-sm ${!incidentErrors[1].isValid && incidentErrors[1].isTouched ? 'is-invalid' : ''}`} value={incident.caller} name="caller" id="caller"
                    onChange={changeHandler} />
                  {(!incidentErrors[1].isValid && incidentErrors[1].isTouched) && <div className='invalid-feedback'>{incidentErrors[1].errorMessages[0]}</div>}
                </div>

              </div>
            </div>

            <div className="col-md-5">
              <div className="row">
                <div className="col-md text-end">
                  <label htmlFor="priority" className='class="form-label"'>Priority</label>
                </div>
                <div className="col-md">
                  <select className="form-select form-select-sm" value={incident.priority} name="priority"
                    aria-label="priority" id='priority' onChange={changeHandler} >
                    {priority.map(priority => (
                      <option value={priority.value} id={priority.id} key={priority.id}>{priority.value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-md-2">
            <div className="col-md-5">
              <div className="row">
                <div className="col-md text-end">
                  <label htmlFor="assignedTo" className='class="form-label"'>Assigned To</label>
                </div>
                <div className="col-md">
                  <input type="text" className='form-control form-control-sm' value={incident.assignedTo} name="assignedTo" id="assignedTo"
                    onChange={changeHandler} />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-md-2">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3 text-end">
                  <label htmlFor="description" className='class="form-label"'><span className='text-danger'>*</span> Description</label>
                </div>
                <div className="col-md-9">
                  <textarea className={`form-control form-control-sm ${!incidentErrors[2].isValid && incidentErrors[2].isTouched ? 'is-invalid' : ''}`} value={incident.description} name="description" id="description"
                    onChange={changeHandler} ></textarea>
                  {(!incidentErrors[2].isValid && incidentErrors[2].isTouched) && <div className='invalid-feedback'>{incidentErrors[2].errorMessages[0]}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-md-2">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3 text-end">
                  <label htmlFor="notes" className='class="form-label"'>Notes</label>
                </div>
                <div className="col-md-9">
                  <textarea className='form-control form-control-sm' value={incident.notes} name="notes" id="notes"
                    onChange={changeHandler} ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

// /*
// **Access Flow/Action data using the fd_data object. Script must return a value.
// **Order number is offset by +1 in Error Handling Section.
// **Available options display upon pressing "." after fd_data
// **example: var shortDesc = fd_data.trigger.current.short_description;
// **return shortDesc;
// */
// var userGroupGr = new GlideRecord('sys_user_group');
// userGroupGr.addQuery('name', fd_data.trigger.current.assignment_group);
// userGroupGr.query();
// userGroupGr.next();
// var userGr = new GlideRecord('sys_user');
// userGr .get(userGroupGr.manager);
// return userGr.email;