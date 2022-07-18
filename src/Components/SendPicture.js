import { Component, h } from '@stencil/core';


// @Component({
//   tag: 'app-home',
//   styleUrl: 'app-home.css',
// })

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc4MDE4MTMsImlkeCI6MiwiaWF0IjoxNjU3NzE1NDEzfQ.REFNF7CBYXRUbzWW9YWM4l5IJKSlch8iTyaSz6xZNBU";
//x-jwt,
const AUTHORIZATION = "x-jwt";

export default function SendPicture() {
//   private fileOne: File;
//   private fileTwo: File;
//   private fileThree: File;
  onFileOneChange(fileChangeEvent) {
    this.fileOne = fileChangeEvent.target.files[0];
  }
  onFileTwoChange(fileChangeEvent) {
    this.fileTwo = fileChangeEvent.target.files[0];
  }
  onFileThreeChange(fileChangeEvent) {
    this.fileThree = fileChangeEvent.target.files[0];
  }
  async submitMultipleForm() {
    let formData = new FormData();
    formData.append('photos[]', this.fileOne, this.fileOne.name);
    formData.append('photos[]', this.fileTwo, this.fileTwo.name);
    formData.append('photos[]', this.fileThree, this.fileThree.name);
    try {
      const response = await fetch('http://localhost:3000/photos/uploads', {
        headers:{
            "x-jwt": TOKEN,
            "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <input type="file" onChange={ev => this.onFileOneChange(ev)}></input>
        <input type="file" onChange={ev => this.onFileTwoChange(ev)}></input>
        <input type="file" onChange={ev => this.onFileThreeChange(ev)}></input>
        <ion-button color="primary" expand="full" onClick={() => this.submitMultipleForm()}>
          Upload Multiple
        </ion-button>
      </ion-content>,
    ];
  }
}