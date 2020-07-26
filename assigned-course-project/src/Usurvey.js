import React, { Component } from 'react';
import * as uuid from 'uuid';
import firebase from 'firebase';

const firebaseConfig = {
  // YOUR CONFIG FILE HERE
};

firebase.initializeApp(firebaseConfig);

class Usurvey extends Component {
  state = {
    uid: uuid.v1(),
    studentName: '',
    answers: {
      answer1: '',
      answer2: '',
      answer3: '',
    },
    isSubmitted: false,
  };

  nameSubmit = (e) => {
    e.preventDefault();
    const studentName = this.nameInput.value;
    this.setState({
      studentName,
    });
  };

  answerSelected = (e) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [e.target.name]: e.target.value,
      },
    });
  };

  questionSubmit = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref('uSurvey/' + this.state.uid)
      .set({
        studentName: this.state.studentName,
        answers: this.state.answers,
      });
    this.setState({
      isSubmitted: true,
    });
  };

  render() {
    let questions;
    let studentName;
    if (this.state.studentName === '' && !this.state.isSubmitted) {
      studentName = (
        <div>
          <h1>Hey Student, please let us know your name: </h1>
          <form onSubmit={this.nameSubmit}>
            <input
              type='text'
              placeholder='Enter your name'
              className='nameInput'
              ref={(el) => (this.nameInput = el)}
            ></input>
          </form>
        </div>
      );
      questions = '';
    } else if (this.state.studentName !== '' && !this.state.isSubmitted) {
      studentName = (
        <div>
          <h1>Welcome to Usurvey, {this.state.studentName}</h1>
        </div>
      );
      questions = (
        <div>
          <h2>Here are some questions</h2>
          <form className='question-form' onSubmit={this.questionSubmit}>
            <div className='card'>
              <label>What kind of courses do you like the most ?</label>
              <div>
                <input
                  type='radio'
                  name='answer1'
                  value='Technology'
                  onChange={this.answerSelected}
                  id='tech'
                ></input>
                <label htmlFor='tech' className='radio-label'>
                  Technology
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  name='answer1'
                  value='Design'
                  onChange={this.answerSelected}
                  id='design'
                ></input>
                <label htmlFor='design' className='radio-label'>
                  Design
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  name='answer1'
                  value='Marketing'
                  onChange={this.answerSelected}
                  id='marketing'
                ></input>
                <label htmlFor='marketing' className='radio-label'>
                  Marketing
                </label>
              </div>
            </div>
            <div className='card'>
              <label>You are a ?</label>
              <div>
                <input
                  type='radio'
                  name='answer2'
                  value='Student'
                  onChange={this.answerSelected}
                  id='student'
                ></input>
                <label htmlFor='student' className='radio-label'>
                  Student
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  name='answer2'
                  value='In-job'
                  onChange={this.answerSelected}
                  id='in-job'
                ></input>
                <label htmlFor='in-job' className='radio-label'>
                  In-job
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  name='answer2'
                  value='Looking-job'
                  onChange={this.answerSelected}
                  id='looking-job'
                ></input>
                <label htmlFor='looking-job' className='radio-label'>
                  Looking-Job
                </label>
              </div>
            </div>
            <div className='card'>
              <label>Online courses helpful ?</label>
              <div>
                <input
                  type='radio'
                  name='answer3'
                  value='Yes'
                  onChange={this.answerSelected}
                  id='yes'
                ></input>
                <label htmlFor='yes' className='radio-label'>
                  Yes
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  name='answer3'
                  value='No'
                  onChange={this.answerSelected}
                  id='no'
                ></input>
                <label htmlFor='no' className='radio-label'>
                  No
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  name='answer3'
                  value='Maybe'
                  onChange={this.answerSelected}
                  id='maybe'
                ></input>
                <label htmlFor='maybe' className='radio-label'>
                  Maybe
                </label>
              </div>
            </div>
            <input
              className='feedback-button'
              type='submit'
              value='submit'
            ></input>
          </form>
        </div>
      );
    } else if (this.state.isSubmitted && this.state.studentName !== '') {
      studentName = <h1>Thanks, {this.state.studentName}</h1>;
    }

    return (
      <div>
        {studentName}
        --------------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
