import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as qrcode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  dblForm: FormGroup;

  inputValue5 = "4,";

  newValue1!: string;
  newValue2!: string;
  newValue3!: string;

  @ViewChild('qrcode', { static: false, read: ElementRef })
  qrcode!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.dblForm = this.fb.group({
      inputValue1: ['', Validators.required],
      inputValue2: ['', Validators.required],
      inputValue3: ['', Validators.required],
      inputValue4: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedValue2 = localStorage.getItem('inputValue2');
    const storedValue3 = localStorage.getItem('inputValue3');
    const storedValue4 = localStorage.getItem('inputValue4');

    if (storedValue2) {
      this.dblForm.patchValue({ inputValue2: storedValue2 });
    }
    if (storedValue3) {
      this.dblForm.patchValue({ inputValue3: storedValue3 });
    }
    if (storedValue4) {
      this.dblForm.patchValue({ inputValue4: storedValue4 });
    }
  }

  onSubmit(): void {
    if (this.dblForm.valid) {
      this.newValue1 = this.inputValue5 + this.dblForm.value.inputValue2 + this.dblForm.value.inputValue1;
      console.log(this.newValue1);
      this.newValue2 = this.inputValue5 + this.dblForm.value.inputValue3 + this.dblForm.value.inputValue1;
      console.log(this.newValue2);
      this.newValue3 = this.inputValue5 + this.dblForm.value.inputValue4 + this.dblForm.value.inputValue1;
      console.log(this.newValue3);

      localStorage.setItem('inputValue2', this.dblForm.value.inputValue2);
      localStorage.setItem('inputValue3', this.dblForm.value.inputValue3);
      localStorage.setItem('inputValue4', this.dblForm.value.inputValue4);
    }
  }

  generateQrCode(value: string): void {
    const qrCodeContainer = this.qrcode.nativeElement;
    qrcode.toCanvas(qrCodeContainer, value, (error: any) => {
      if (error) {
        console.log("Problèmes : ", error);
      }
    });
  }
}
