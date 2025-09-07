import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';



class HomeFooter extends Component {


    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2025 BookingCare. More information, please visit our website <a href='https://bookingcare.vn' target='_blank' rel="noreferrer">BookingCare.vn</a></p>
                <p>Hotline: 1900 1234 (ext 4567)</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
