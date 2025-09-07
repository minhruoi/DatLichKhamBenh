import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';



class HandBook extends Component {


    render() {

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>6</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>7</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>8</div>
                            </div>
                        </Slider>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
