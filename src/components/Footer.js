import React from 'react'

const Footer = () => {
    return (
        <div className='footer'>
            <footer>
                <div className='footerTopContainer'>
                    <div className='topBtn'>
                        <li>Back to top</li>
                    </div>
                </div>
                <nav>
                    <div className='footerContainer'>
                        <div className='footerRow'>
                            <ol>
                                <div className='title'>
                                    <li>About Us</li>
                                </div>
                                <li>About Shamazon</li>
                                <li>Shamazon Newsletter</li>
                                <li>Careers</li>
                                <li>History</li>
                                <li>Management</li>
                            </ol>
                        </div>
                        <div className='footerRow'>
                            <ol>
                                <div className='title'>
                                    <li>Our products</li>
                                </div>
                                <li>Apple</li>
                                <li>Microsoft</li>
                                <li>Samsung</li>
                                <li>Other</li>
                            </ol>
                        </div>
                        <div className='footerRow'>
                            <ol>
                                <div className='title'>
                                    <li>Our reward program</li>
                                </div>
                                <li>Credit card</li>
                                <li>Debit card</li>
                                <li>Coupons</li>
                                <li>Discount</li>
                                <li>Holidays</li>
                            </ol>
                        </div>
                        <div className='footerRow'>
                            <ol>
                                <div className='title'>
                                    <li>Contact us</li>
                                </div>
                                <li>Phone: xxx-xxx-xxxx</li>
                                <li>Emails: xxx.xxx@gmail.com</li>
                                <li>Chat with us</li>
                                <li>24/7 customer service</li>
                                <li>Address: xxx,xxx,xxx,xxx</li>
                            </ol>
                        </div>
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer