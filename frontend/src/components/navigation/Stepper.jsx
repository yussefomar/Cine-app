import { Fragment } from 'react';

export function Stepper({ activeStep }) {
    const steps = ['Función', 'Asientos', 'Pago'];

    return (
        <div className="stepper">
            {steps.map((label, index) => {
                const step = index + 1;
                return (
                    <Fragment key={label}>
                        {index > 0 && <i />}
                        <span
                            className={
                                step < activeStep
                                    ? 'done'
                                    : step === activeStep
                                      ? 'active'
                                      : ''
                            }
                        >
                            {step}
                        </span>
                        <b>{label}</b>
                    </Fragment>
                );
            })}
        </div>
    );
}
