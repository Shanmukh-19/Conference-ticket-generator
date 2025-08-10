import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './validation-form.html',
  styleUrl: './validation-form.css'
})
export class ValidationForm {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Output() formSuccess = new EventEmitter<{
    name: string;
    email: string;
    imageUrl: string;
  }>();

  imageUrl = '';
  isInvalidEmail = false;
  fileSizeExceed = false;
  previewUrl: string | null = null;
  fileSelected = false;

  triggerFileDialog() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected = true;

      if (file.size > 500000) {
        this.fileSizeExceed = true;
        this.previewUrl = null;
        return;
      }

      this.fileSizeExceed = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.imageUrl = this.previewUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.imageUrl = '';
    this.fileSelected = false;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onSubmit(form: any) {
    this.isInvalidEmail = !this.validateEmail(form.value.email);
    if (form.valid && !this.fileSizeExceed && !this.isInvalidEmail) {
      this.formSuccess.emit({
        name: form.value.name,
        email: form.value.email,
        imageUrl: this.imageUrl
      });
    }
  }
}
