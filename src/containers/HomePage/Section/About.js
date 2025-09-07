import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';



class About extends Component {


    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    <div className='section-header'>
                        <span className='title-section'>Giới thiệu về BookingCare</span>
                        <button className='btn-section'>Tìm hiểu thêm</button>
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="100%" height="400px"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="Hướng dẫn đặt lịch khám bệnh online trên BookingCare"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>
                        <div className='content-right'>
                            <p>BookingCare là nền tảng y tế chăm sóc sức khỏe toàn diện, giúp người bệnh kết nối với các bác sĩ và cơ sở y tế hàng đầu tại Việt Nam. Với sứ mệnh mang lại trải nghiệm chăm sóc sức khỏe tiện lợi, nhanh chóng và hiệu quả, BookingCare cung cấp các dịch vụ đặt lịch khám trực tuyến, tư vấn y tế từ xa và quản lý hồ sơ sức khỏe cá nhân.</p>
                            <p>Chúng tôi cam kết đồng hành cùng người bệnh trên hành trình chăm sóc sức khỏe, mang lại sự an tâm và hài lòng tối đa. Hãy để BookingCare trở thành người bạn đồng hành tin cậy trong việc bảo vệ sức khỏe của bạn và gia đình.</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
