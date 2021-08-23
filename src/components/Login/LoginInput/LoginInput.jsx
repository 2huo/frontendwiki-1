import React from "react";
import styles from "./LoginInput.module.css";
import axios from "axios";
import { message } from 'antd';

class LoginInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          email: '',
          password: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    //读取输入的内容
    handleChangeName(event) {
      this.setState({username: event.target.value});
    }
    handleChangeEmail(event) {
      this.setState({email: event.target.value});
    }
    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }
    
    //登录
    handleLogin(event) {
      event.preventDefault();
      let username =this.state.username
      let password =this.state.password

      //验证输入的有效性和格式
      if(username === '' || password === '') {
        message.warning('输入不能为空');
        return
      }
      if(username.length >= 10) {
        message.warning('用户名不能超过10个字符');
        return
      }
      this.loginRequest();
    }
    //注册
    handleRegister(event) {
      event.preventDefault();
      let username =this.state.username
      let email = this.state.email
      let password =this.state.password

      //验证输入的有效性和格式
      if(username === '' || password === '' || email === '') {
        message.warning('输入不能为空');
        return
      }
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(!reg.test(email)) {
        message.warning('请输入有效邮箱');
        return
      }
      if(email.length >= 20) {
        message.warning('邮箱长度不能超过20个字符');
        return
      }
      this.registerRequest();
    }

    //注册请求
    registerRequest() {
      axios({
        method: 'post',
        url: 'http://t.mitsuha.space:8001/api/v1/user/register',
        data: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(function(response) {
        let ret = response.data
        if (ret.message === "注册成功") {
          message.success(ret.message + '，即将跳转到个人主页');
          localStorage.setItem('profile', JSON.stringify(ret))
          //跳转到个人页面
          window.location.href = "/user.html"
        } else {
          alert(response.data.message)
        }
      })
      .catch(function (error) {
        alert("用户名已存在，换个名字吧")
      });
    }

    //登录请求
    loginRequest () {
      axios({
        method: 'post',
        url: 'http://t.mitsuha.space:8001/api/v1/user/login',
        data: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then(function(response) {
        let ret = response.data
        console.log(ret)
        if (ret.message === "登录成功") {
          localStorage.setItem('profile', JSON.stringify(ret))
          message.success(ret.message + '，即将跳转到个人主页');
          //跳转到个人页面
          window.location.href = "/user.html"
        }
      })
      .catch(function (error) {
        message.error('用户名不存在或密码错误');
      });
    }

    render() {

      let isLogin = this.props.login;
      if(isLogin === 'login'){
        return (
          <>
              <div className={styles.optionsFormRight} id='bounceLeft'>

                <div className={styles.formLogin} id='login'>
                  <h1 className={styles.title}>账号登录</h1>
                  <form onSubmit={this.handleLogin}> 
                    <div>
                      <div>
                        <input type="text"
                          placeholder="用户名"
                          className={styles.formInput}
                          username={this.state.username} onChange={this.handleChangeName}
                        ></input>
                      </div>
                      <div>
                        <input type="password"
                          placeholder="密码"
                          className={styles.formInput}
                          password={this.state.password} onChange={this.handleChangePassword}
                        ></input>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button className={styles.buttomForgot} type="button">忘记密码?</button>
                      <input
                        className={styles.buttonsAction}
                        type="submit" value="登录"
                      >
                      </input>
                    </div>
                  </form>
                </div>

              </div>
        </>
      );
      } else {
          return (
            <>
                <div className={styles.optionsFormLeft} id='bounceRight'>
                  <div className={styles.formLogin} id='signup'>
                    <h1 className={styles.title}>账号注册</h1>
                    <form onSubmit={this.handleRegister} id='register-form'>
                      <div>
                        <div>
                            <input type="text"
                              placeholder="用户名"
                              className={styles.formInput}
                              username={this.state.username} onChange={this.handleChangeName}
                            ></input>
                        </div>
                        <div>
                          <input type="email"
                            placeholder="邮箱"
                            className={styles.formInput}
                            email={this.state.email} onChange={this.handleChangeEmail}
                          ></input>
                        </div>
                        <div>
                          <input type="password"
                            placeholder="输入密码"
                            className={styles.formInput}
                            password={this.state.password} onChange={this.handleChangePassword}
                          ></input>
                        </div>
                      </div>
                      <div className={styles.buttons}>
                        <input className={styles.buttonsAction} type="submit" value="注册"></input>
                      </div>
                    </form>
                  </div>
                </div>
            </>
        );
      }
      
    }
}

export default LoginInput;