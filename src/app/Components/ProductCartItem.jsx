import { FaRegTrashAlt } from 'react-icons/fa';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { decreaseAmount, increaseAmount } from './../state/CartSlice';
import { useState } from 'react';
import "./ProductCartItem.css"

function ProductCartItem({ ele, onChangeOption }) {
    const dispatch = useDispatch();

    const initialFlavor = Array.isArray(ele.flavor) && ele.flavor.length > 0 ? ele.flavor[0] : '';

    const [selectedFlavor, setSelectedFlavor] = useState(initialFlavor);
    const price = Number(ele.price ?? ele.newPrice ?? 0);

    return (
        <div className="cart-item">
            <div className="cart-item-container">
                <img src={ele.image} alt={ele.name} className="cart-item-image" />
                <div className="cart-item-details justify-content-center">
                    <h3 className="title cart-item-title">{ele.name}</h3>
                    <p className="cart-item-description">{ele.description}</p>
                    <p className="cart-item-price">
                        <span className="currency">$</span>{price}
                        {ele.oldPrice && <span className='oldPrice opacity-50 ms-2 fw-normal text-decoration-line-through' style={{fontSize: "0.8rem"}}>{ele.oldPrice}</span>}
                    </p>

                    <div className="cart-item-meta control-card">
                        {/* SELECT FLAVOR */}
                        {Array.isArray(ele.flavor) && ele.flavor.length > 0 && (
                            <div className="mb-2 d-flex align-items-center gap-1">
                                <label className="title form-label mb-0">Flavor:</label>
                                <select 
                                    className="form-select fw-semibold"
                                    value={selectedFlavor}
                                    onChange={(e) => {
                                        setSelectedFlavor(e.target.value);
                                        onChangeOption?.(ele.id, e.target.value);
                                    }}
                                >
                                    {ele.flavor.map(f => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>

                            </div>
                        )}

                        {/* QUANTITY CONTROLS */}
                        <div className="cart-item-actions">
                            <div className="quantity-control">
                                {ele.amount > 1 ? (
                                    <FaMinus 
                                        className="icon clickable" 
                                        onClick={() => dispatch(decreaseAmount({ id: ele.id, price: price }))} 
                                    />
                                ) : (
                                    <FaRegTrashAlt 
                                        className="icon clickable" 
                                        onClick={() => dispatch(decreaseAmount({ id: ele.id, price: price }))} 
                                    />
                                )}
                                <span className="quantity">{ele.amount}</span>
                                <FaPlus 
                                    className="icon clickable" 
                                    onClick={() => dispatch(increaseAmount({ id: ele.id, price: price }))} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCartItem;
