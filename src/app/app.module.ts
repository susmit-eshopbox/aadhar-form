import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AddharReactiveComponent } from './aadhar-reactive/profile-editor.component';
import { AddharTemplateComponent } from './aadhar-template/profile-editor.component';
import { ForbiddenValidatorDirective } from './shared/forbidden-name.directive';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from './title-case.pipe';
import { HighlightDirective } from './highlight/highlight.component';
import { ToggleDirective } from './toggle.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NameEditorComponent,
    ProfileEditorComponent,
    AddharReactiveComponent,
    AddharTemplateComponent,
    ForbiddenValidatorDirective,
    UsersComponent,
    UserDetailComponent,
    TitleCasePipe,
    HighlightDirective,
    ToggleDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterTestingModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    // other imports ...
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
