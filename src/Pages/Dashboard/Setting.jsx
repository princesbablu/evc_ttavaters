import React, { useContext, useEffect, useState } from 'react';
import dropdown from "../../assets/img/dashboard/icons/dropdown.png";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Setting = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedOption, setSelectedOption] = useState('auto');
    const [customValue, setCustomValue] = useState('0.5');
  const [customValue1, setCustomValue1] = useState('10');
    // const { customValue, setCustomValue, customValue1, setCustomValue1 } = useContext(Context);
    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        setIsActive(!isActive);
    };
    const handleClick = (option) => {
        setSelectedOption(option);
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        setSelectedOption(customValue === '0.5' ? 'auto' : 'custom');
    };
    useEffect(() => {
        if (selectedOption === 'auto' && customValue !== '0.5') {
            setCustomValue('0.5');
        }
        console.log("currentcustomValue", customValue);
    }, [selectedOption, customValue]);




    const toggleAccordion1 = () => {
        setIsOpen1(!isOpen1);
    };

    const handleCustomInputChange = (event) => {
        let newValue = event.target.value.replace(/[^\d.]/g, '');
        newValue = newValue === '' ? '0.05' : newValue > 50 ? '50' : newValue;
        setCustomValue(newValue);
        setSelectedOption('custom');
    };    
    
    
    const handleCustomInputChange1 = (event) => {
        const newValue = event.target.value.replace(/[^\d.]/g, '');
        setCustomValue1(newValue);
    };

    console.log("customValue1", customValue1);

    return (
        <div className="setting setting1">
            <div className="setting-parent ">
                <div className="trendswapx-parent">
                    <div className="trendswapx">TrendDx</div>
                    <div className="when-available-aggregates-container">
                        <p className="when-available-aggregates">when available, aggregates</p>
                        <p className="when-available-aggregates">liquidity sources for better prices</p>
                        <p className="and-gas-free-swaps-learn-more">
                            <span className="and-gas-free">{`and gas free swaps. `}</span>
                            <b className="learn-more" style={{ cursor: 'pointer' }}>Learn more</b>
                        </p>
                    </div>
                </div>
                <div className={`toggle-button ${isActive ? 'active' : ''}`} style={{ backgroundColor: isActive ? 'rgb(64, 252, 254,0.8)' : '#353535' }} onClick={toggleButton}>
                    <div className="toggle-button-child"></div>
                </div>
            </div>
            <div className="frame-group">
                <div className="frame-container ">
                    <div className="max-slippage-parent">
                        <div className="max-slippage">Max. slippage</div>
                        <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          Max Slippage
                        </Tooltip>
                      }
                    >
                      <i className="bi bi-info-circle ps-1"></i>
                    </OverlayTrigger>
                    <span className="text-white"> : {customValue}</span>
                    </div>
                    <div className="auto-parent" onClick={toggleAccordion}>
                        <b className="auto">
                            {selectedOption === 'auto' ? 'Auto' : selectedOption === 'custom' ?
                                (customValue > 50 ? (Math.floor(customValue / 10) + '%') : (customValue || 0.5) + '%') :
                                'Default Value'}
                        </b>

                        <img className="component-3-icon" style={{cursor: 'pointer'}} alt="" src={dropdown} />
                    </div>
                </div>
                {isOpen && (
                    <div className="gmxWyU ">
                        <div className='bIFEzi eVSMfe dKubqp'>
                            <div className='gTwleA cPCYrp dKubqp'>
                                <div className={`option ${selectedOption === 'auto' ? 'dznSOZ' : 'fCURlt'}`}
                                    onClick={() => handleClick('auto')}>
                                    <div className='jwRPKK css-1urox24 '>
                                        Auto
                                    </div>
                                </div>
                                <div className={`option ${selectedOption === 'custom' ? 'dznSOZ' : 'fCURlt'}`}
                                    onClick={() => handleClick('custom')}>
                                    <div className='jwRPKK css-1urox24 '>
                                        Custom
                                    </div>
                                </div>
                            </div>

                            <div className='bkPaeK eVSMfe dKubqp'>
                                <input
                                    placeholder="0.5"
                                    className="Input-sc-e21c87fc-0 eupJID"
                                    value={customValue}
                                    onChange={(e) => handleCustomInputChange(e)}
                                    style={{ color: parseInt(customValue) > 50 ? 'red' : 'inherit' }}
                                />
                                <div className="text__TextWrapper-sc-e16ffa80-0 jwRPKK css-1urox24">%</div>
                            </div>
                        </div>
                        {
                            customValue > 1 && <div className='css-142zc9n hMbAQl' style={{ width: '260px' }}>Your transaction may be frontrun and result in an unfavorable trade.</div>

                        }
                        {
                            customValue < 0.05 && <div className='css-142zc9n hMbAQl' style={{ width: '260px' }}>Slippage below 0.05% may result in a failed transaction</div>

                        }
                    </div>
                )}
                <div className="frame-container">
                    <div className="max-slippage-parent">
                        <div className="max-slippage">Transaction deadline</div>
                        <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                         Transaction deadline
                        </Tooltip>
                      }
                    >
                      <i className="bi bi-info-circle ps-1"></i>
                    </OverlayTrigger>
                    </div>
                    <div className="auto-parent" onClick={toggleAccordion1}>
                        <b className="auto">{(parseInt(customValue1) > 4320 ? customValue1.toString().substring(0, 3) : customValue1) || '10'}m</b>
                        <img className="component-3-icon" style={{cursor: 'pointer'}} alt="" src={dropdown} />
                    </div>

                </div>
                {isOpen1 && (
                    <div className='bkPaeK eVSMfe dKubqp' style={{ width: '100%' }}>
                        <input
                            placeholder="10"
                            className="Input-sc-e21c87fc-0 eupJID"
                            value={customValue1}
                            onChange={handleCustomInputChange1}
                            style={{ color: parseInt(customValue1) > 4320 ? 'red' : 'inherit' }}
                        />
                        <div className="text__TextWrapper-sc-e16ffa80-0 jwRPKK css-1urox24">Minutes</div>
                    </div>

                )}
            </div>
        </div>
    );
}

export default Setting;
