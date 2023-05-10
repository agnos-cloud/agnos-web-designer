import type { HTMLInputTypeAttribute } from "react";

export interface Form {
  title: string;
  actions?: Array<FormAction>;
  disableNavigation: boolean; // TODO: if true you can't navigate to the Next or Previous form
  fields?: Array<FormField | FormFieldGroup>;
}

export interface FormAction {
  title: string;
  run: string;
  transform?: string; // this is a function that will determine the objects passed to the run function
}

export interface FormField {
  name: string;
  title: string;
  default?: any;
  required?: boolean;
  type?: HTMLInputTypeAttribute | "multi-select" | "rating" | "select" | "switch";
}

export interface FormFieldGroup {
  title: string;
  fields?: Array<FormField | FormFieldGroup>;
}

/**
 * create react component from json form fields
 * https://www.youtube.com/watch?v=NMxMWOZC-Ec
 * https://stackoverflow.com/questions/31234500/create-react-component-dynamically
 */
