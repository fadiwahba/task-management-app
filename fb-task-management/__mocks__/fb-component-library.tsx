import React from "react";

export const Button = (props: any) => <button {...props} />;
export const Dialog = ({ children, open, onOpenChange, ...rest }: any) => (
  open ? <div {...rest}>{children}</div> : null
);
export const DialogContent = ({ children }: any) => <div>{children}</div>;
export const DialogHeader = ({ children }: any) => <div>{children}</div>;
export const DialogTitle = ({ children }: any) => <h2>{children}</h2>;
export const DialogDescription = ({ children }: any) => <p>{children}</p>;
export const DialogFooter = ({ children }: any) => <div>{children}</div>;

export const Form = ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);

// Provide a fake but safe field object
export const FormField = ({ render, ...rest }: any) =>
  render({
    field: {
      name: rest.name || "mock",
      value: rest.value ?? "",
      onChange: rest.onChange || jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    },
    fieldState: {},
  });

export const FormControl = ({ children }: any) => <>{children}</>;
export const FormItem = ({ children }: any) => <div>{children}</div>;
export const FormLabel = ({ children }: any) => <label>{children}</label>;
export const FormMessage = ({ children }: any) => <span>{children}</span>;

export const Input = (props: any) => <input {...props} />;
export const Textarea = (props: any) => <textarea {...props} />;

export const Select = ({
  children,
  onValueChange,
  defaultValue,
  disabled,
}: any) => (
  <select
    defaultValue={defaultValue}
    disabled={disabled}
    onChange={(e) => onValueChange?.(e.target.value)}
  >
    {children}
  </select>
);
export const SelectContent = ({ children }: any) => <>{children}</>;
export const SelectItem = ({ value, children }: any) => (
  <option value={value}>{children}</option>
);
export const SelectTrigger = ({ children }: any) => <>{children}</>;
export const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;

export const Card = ({ children, className, ...rest }: any) => (
  <div className={className} {...rest}>{children}</div>
);
export const CardContent = ({ children, className, ...rest }: any) => (
  <div className={className} {...rest}>{children}</div>
);
export const CardHeader = ({ children, className, ...rest }: any) => (
  <div className={className} {...rest}>{children}</div>
);
export const CardTitle = ({ children, className, ...rest }: any) => (
  <h3 className={className} {...rest}>{children}</h3>
);

export const Badge = ({ children, variant, className, onClick, ...rest }: any) => (
  <span className={className} onClick={onClick} {...rest}>{children}</span>
);

export const DropdownMenu = ({ children }: any) => <div>{children}</div>;
export const DropdownMenuTrigger = ({ asChild, children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);
export const DropdownMenuContent = ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);
export const DropdownMenuItem = ({ children, onClick, onSelect, ...rest }: any) => (
  <div
    {...rest}
    onClick={(e: any) => {
      onClick?.(e);
      onSelect?.(e);
    }}
  >
    {children}
  </div>
);

export const AlertDialog = ({ children, open, onOpenChange }: any) => (
  open ? <div data-testid="alert-dialog">{children}</div> : null
);
export const AlertDialogTrigger = ({ asChild, children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);
export const AlertDialogContent = ({ children }: any) => <div>{children}</div>;
export const AlertDialogHeader = ({ children }: any) => <div>{children}</div>;
export const AlertDialogTitle = ({ children }: any) => <h2>{children}</h2>;
export const AlertDialogDescription = ({ children }: any) => <p>{children}</p>;
export const AlertDialogFooter = ({ children }: any) => <div>{children}</div>;
export const AlertDialogAction = ({ children, onClick, ...rest }: any) => (
  <button onClick={onClick} {...rest}>{children}</button>
);
export const AlertDialogCancel = ({ children, ...rest }: any) => (
  <button {...rest}>{children}</button>
);

export const Label = ({ children, htmlFor, ...rest }: any) => (
  <label htmlFor={htmlFor} {...rest}>{children}</label>
);

export const ThemeToggle = ({ theme, setTheme, ...rest }: any) => (
  <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} {...rest}>
    Toggle Theme
  </button>
);
