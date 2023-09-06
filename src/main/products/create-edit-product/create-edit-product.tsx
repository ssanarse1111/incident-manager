import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { SharedContext } from '../../../context/shared-context';
import { InputValidations } from '../../../models/inputValidation';
import { Product } from '../../../models/product';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../store/thunks/productsThunk';

export const CreateEditProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, data: createProductData, error } = useSelector((state: any) => state.products);
    const [product, setProduct] = useState<Product>(new Product());
    const [productErrors, setProductErrors] = useState<InputValidations[]>([
        { name: 'number', isValid: false, isTouched: false, errorMessages: ['Product Number is required'] },
        { name: 'name', isValid: false, isTouched: false, errorMessages: ['Product Name is required'] },
    ]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [currentValues, setCurrentValues] = useState<{ name: string, value: string }>({ name: '', value: '' });
    const { v4: uuidv4 } = require('uuid');

    useEffect(() => {
        let newproductNumber: string;
        const PdtNumber = location.state ? location.state.productNumber ? location.state.productNumber : 'PDT000000' : 'PDT000000';
        let slicedStringNumber = PdtNumber.slice(3, PdtNumber.length);
        const firstIndex = PdtNumber.startsWith('0', 3);
        if (firstIndex) {
            slicedStringNumber = (1).toString() + slicedStringNumber;
            const newPdtNumber = parseInt(slicedStringNumber) + 1;
            newproductNumber = 'PDT' + newPdtNumber.toString().slice(1, newPdtNumber.toString().length);
        } else {
            const newPdtNumber = parseInt(slicedStringNumber) + 1;
            newproductNumber = 'PDT' + newPdtNumber;
        }
        setProduct(prev => ({ ...prev, number: newproductNumber }));

        const errros = productErrors.map(x => ({ ...x, isValid: x.name === 'number' ? true : false }));
        setProductErrors(errros);

    }, []);

    function changeHandler(event: any) {
        const { name, value } = event.target;
        setProduct((prev) => ({ ...prev, [name]: value.trim() }));
        setCurrentValues({ name: name, value: value.trim() });
    }

    function uploadImage(event: any) {
        const uploadedImage = document.getElementById('showImg') as any;
        console.log(event.target.files[0]);
              
        // product.image = {...event.target.files[0]};
        // console.log(event.target.files);
        
        // console.log('product.image', product.image);
        
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                uploadedImage.src = event.target?.result;
                product.image  = event.target?.result?.toString() as any
                console.log(event.target?.result?.toString());
                
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    useEffect(() => {
        const errorCheckName = productErrors.find(x => x.name === currentValues.name)?.name
        if (errorCheckName) {
            const errors = productErrors.map(x => ({
                ...x,
                isTouched: x.name === currentValues.name ? true : x.isTouched,
                isValid: x.name === currentValues.name ? currentValues.value.length > 0 ? true : false : x.isValid
            }));
            setProductErrors(errors);
        }
    }, [currentValues])

    useEffect(() => {
        setIsSubmit(!(productErrors.filter(x => !x.isValid).length === 0));
    }, [productErrors])

    function back(event: any) {
        event.preventDefault();
        navigate(-1);
    }

    function submit(event: any) {
        event.preventDefault();
        const data = { ...product, id: uuidv4() };
        console.log('data', data);
        
        const isValidLength = productErrors.filter(x => !x.isValid).length;
        setProductErrors(productErrors.map(x => ({ ...x, isTouched: true })));
        if (isValidLength === 0) {
            // createproduct(data);
            dispatch(createProduct(product) as any)

            setProduct(new Product());
            navigate(-1);
        } else {
            // navigate(-1);
        }
    }

    // APIs
    const createproduct = useCallback(async (data: any) => {
        const response = await fetch('http://localhost:3005/products/', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseJson = await response.json();
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
                                    <label htmlFor="number" className='class="form-label"'><span className='text-danger'>*</span> Product Number</label>
                                </div>
                                <div className="col-md">
                                    <input type="text" className={`form-control form-control-sm ${!productErrors[0].isValid && productErrors[0].isTouched ? 'is-invalid' : ''}`}
                                        disabled value={product.number} name="number" id="number" onChange={changeHandler} />
                                    {(!productErrors[0].isValid && productErrors[0].isTouched) && <div className='invalid-feedback'>{productErrors[0].errorMessages[0]}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md text-end">
                                    <label htmlFor="name" className='class="form-label"'><span className='text-danger'>*</span> Product Name</label>
                                </div>
                                <div className="col-md">
                                    <input type="text" className={`form-control form-control-sm ${!productErrors[1].isValid && productErrors[1].isTouched ? 'is-invalid' : ''}`}
                                        value={product.name} name="name" id="name" onChange={changeHandler} />
                                    {(!productErrors[1].isValid && productErrors[1].isTouched) && <div className='invalid-feedback'>{productErrors[1].errorMessages[0]}</div>}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row mb-md-2">
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md text-end">
                                    <label htmlFor="price" className='class="form-label"'> Price</label>
                                </div>
                                <div className="col-md">
                                    <input type="number" className={`form-control form-control-sm`}
                                        value={product.price} name="price" id="price" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md text-end">
                                    <label htmlFor="quantity" className='class="form-label"'> Quantity</label>
                                </div>
                                <div className="col-md">
                                    <input type="number" className={`form-control form-control-sm`}
                                        value={product.quantity} name="quantity" id="quantity" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-md-2">
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-3 text-end">
                                    <label htmlFor="specification" className='class="form-label"'>Specification</label>
                                </div>
                                <div className="col-md-9">
                                    <textarea className='form-control form-control-sm' value={product.specification} name="specification" id="specification"
                                        onChange={changeHandler} ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-md-2">
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md text-end">
                                    <label htmlFor="image" className='class="form-label"'> Product Image</label>
                                </div>
                                <div className="col-md">
                                    <input type="file" className={`form-control form-control-sm`}
                                        name="image" id="image" accept="image/jpeg, image/png, image/jpg"
                                        onChange={uploadImage} />
                                    <img alt="Product Image" height={100} width={100} id='showImg' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
