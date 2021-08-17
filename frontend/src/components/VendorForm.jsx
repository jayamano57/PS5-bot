import React, {useState} from "react";
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import EmailForm from "./EmailForm";
import AddressForm from "./AddressForm";
import CreditCardForm from "./CreditCardForm";
import ScheduleForm from "./ScheduleForm";
import Summary from "./Summary";
import { toast } from 'react-toastify';

const ModalContainer = styled.div`
    background-color: #e6e6e6;
    box-shadow: 0 0 6px 4px #7a7a7a;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 1.6rem;
    max-width: 81rem;
    margin: auto;
`
const MuiStepper = styled(Stepper)`
    background-color: transparent !important;
`
const MuiStep = styled(Step)`
    .MuiStepConnector-root {
        top: 1.2rem;
    }
    .MuiSvgIcon-root {
        font-size: 2.4rem !important;
        text {
            font-size: .9rem;
        }
    }
    .MuiStepIcon-active {
        color: #895dc4 !important;
    }
    .MuiTypography-root {
        font-size: 1.2rem;
        margin-top: 1rem !important;
    }
`
const FormContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 5rem 0 2rem;
`
const ButtonContainer = styled.div`
    padding: 0 6rem;
    display: flex;
    justify-content: flex-end;
    button {
        margin-left: 2rem;
    }
`

export default function VendorForm({handleClose, vendor}) {
    const [activeStep, setActiveStep] = useState(0);
    // form data
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [ccFirstName, setCcFirstName] = useState('');
    const [ccLastName, setCcLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [ccMonth, setCcMonth] = useState('');
    const [ccYear, setCcYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [ccPhoneNumber, setCcPhoneNumber] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    // validation
    const [emailValid, setEmailValid] = useState('');
    const [firstNameValid, setFirstNameValid] = useState('');
    const [lastNameValid, setLastNameValid] = useState('');
    const [phoneNumberValid, setPhoneNumberValid] = useState('');
    const [address1Valid, setAddress1Valid] = useState('');
    const [cityValid, setCityValid] = useState('');
    const [stateValid, setStateValid] = useState('');
    const [zipValid, setZipValid] = useState('');
    const [ccFirstNameValid, setCcFirstNameValid] = useState('');
    const [ccLastNameValid, setCcLastNameValid] = useState('');
    const [cardNumberValid, setCardNumberValid] = useState('');
    const [ccMonthValid, setCcMonthValid] = useState('');
    const [ccYearValid, setCcYearValid] = useState('');
    const [cvvValid, setCvvValid] = useState('');
    const [ccPhoneNumberValid, setCcPhoneNumberValid] = useState('');
    const [scheduleDateValid, setScheduleDateValid] = useState('');
    const [scheduleTimeValid, setScheduleTimeValid]= useState('');
    // other state
    const [isLoading, setIsLoading] = useState(false);
    const [watcher, setWatcher] = useState(false);
    

    function getSteps() {
      return ['Email', 'Address', 'Card Info', 'Schedule'];
    }
      
    function getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
            return <EmailForm email={email} setEmail={setEmail} emailValid={emailValid}/>
        case 1:
            return <AddressForm firstName={firstName} setFirstName={setFirstName} firstNameValid={firstNameValid} lastName={lastName} setLastName={setLastName} lastNameValid={lastNameValid} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} phoneNumberValid={phoneNumberValid} address1={address1} setAddress1={setAddress1} address1Valid={address1Valid} address2={address2} setAddress2={setAddress2} city={city} setCity={setCity} cityValid={cityValid} state={state} setState={setState} stateValid={stateValid} zip={zip} setZip={setZip} zipValid={zipValid}/>
        case 2:
            return <CreditCardForm firstName={ccFirstName} setFirstName={setCcFirstName} firstNameValid={ccFirstNameValid} lastName={ccLastName} setLastName={setCcLastName} lastNameValid={ccLastNameValid} cardNumber={cardNumber} setCardNumber={setCardNumber} cardNumberValid={cardNumberValid} month={ccMonth} setMonth={setCcMonth} monthValid={ccMonthValid} year={ccYear} setYear={setCcYear} yearValid={ccYearValid} cvv={cvv} setCvv={setCvv} cvvValid={cvvValid} phoneNumber={ccPhoneNumber} setPhoneNumber={setCcPhoneNumber} phoneNumberValid={ccPhoneNumberValid} />
        case 3:
            return <ScheduleForm watcher={watcher} setWatcher={e => setWatcher(e.target.checked)} scheduleDate={scheduleDate} setScheduleDate={setScheduleDate} scheduleDateValid={scheduleDateValid} scheduleTime={scheduleTime} setScheduleTime={setScheduleTime} scheduleTimeValid={scheduleTimeValid} ></ScheduleForm>
        default:
          return 'Unknown stepIndex';
      }
    }
      
    const steps = getSteps();
    
    const handleNext = () => {
        if (activeStep === 0 && validateEmailForm()) return;
        if (activeStep === 1 && validateAddressForm()) return;
        if (activeStep === 2 && validateCardForm()) return;
        if (activeStep === 3 && validateScheduleForm()) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // validation functions
    const validateEmailForm = () => {
        let message = '';
        if (email.trim() === '') {
            message = 'Please enter an email address';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) (
            message = 'Please enter a valid email address'
        )
        setEmailValid(message);
        return message
    }

    const validateAddressForm = () => {
        let invalid = false;
        let firstNameValidMessage = '';
        let lastNameValidMessage = '';
        let phoneNumberValidMessage = '';
        let address1ValidMessage = '';
        let cityValidMessage = '';
        let stateValidMessage = '';
        let zipValidMessage = '';
        if (firstName.trim() === "") {
            invalid = true;
            firstNameValidMessage ='This field is required';
        }
        if (lastName.trim() === "") {
            invalid = true;
            lastNameValidMessage ='This field is required';
        }
        if (phoneNumber.trim() === "") {
            invalid = true;
            phoneNumberValidMessage = 'This field is required';
        }
        if (address1.trim() === "") {
            invalid = true;
            address1ValidMessage = 'This field is required';
        }
        if (city.trim() === "") {
            invalid = true;
            cityValidMessage = 'This field is required';
        }
        if (state.trim() === "") {
            invalid = true;
            stateValidMessage = 'This field is required';
        }
        if (zip.trim() === "") {
            invalid = true;
            zipValidMessage = 'This field is required';
        }
        setFirstNameValid(firstNameValidMessage);
        setLastNameValid(lastNameValidMessage);
        setPhoneNumberValid(phoneNumberValidMessage);
        setAddress1Valid(address1ValidMessage);
        setCityValid(cityValidMessage)
        setStateValid(stateValidMessage)
        setZipValid(zipValidMessage)

        return invalid;
    }

    const validateCardForm = () => {
        let invalid = false;
        let firstNameValidMessage = ''
        let lastNameValidMessage = ''
        let cardNumberValidMessage = '';
        let monthValidMessage = ''
        let yearValidMessage = ''
        let cvvValidMessage = ''
        let phoneValidMessage = ''
        if (ccFirstName.trim() === '') {
            invalid = true;
            firstNameValidMessage = 'This field is required'
        }
        if (ccLastName.trim() === '') {
            invalid = true;
            lastNameValidMessage ='This field is required';
        }
        if (cardNumber.trim() === '') {
            invalid = true;
            cardNumberValidMessage = 'This field is required';
        }
        if (cardNumber && !/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(cardNumber)) {
            invalid = true;
            cardNumberValidMessage = 'Please enter a valid credit card number'
        }
        if (ccMonth.trim() === '') {
            invalid = true;
            monthValidMessage = 'This field is required';
        }
        if (ccYear.trim() === '') {
            invalid = true;
            yearValidMessage = 'This field is required';
        }
        if (cvv.trim() === '') {
            invalid = true;
            cvvValidMessage = 'This field is required';
        }
        if (ccPhoneNumber.trim() === '') {
            invalid = true;
            phoneValidMessage = 'This field is required';
        }

        setCcFirstNameValid(firstNameValidMessage); 
        setCcLastNameValid(lastNameValidMessage)
        setCardNumberValid(cardNumberValidMessage)
        setCcMonthValid(monthValidMessage)
        setCcYearValid(yearValidMessage)
        setCvvValid(cvvValidMessage)
        setCcPhoneNumberValid(phoneValidMessage)
        return invalid;
    }

    const validateScheduleForm = () => {
        let invalid = false;
        let scheduleDateValidMessage = '';
        let scheduleTimeValidMessage = '';
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const currentDate = `${year}-${month}-${day}`;
        const dayInPast = scheduleDate < currentDate;
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const currentTime = `${hour}:${min}`;
        const timeInPast = scheduleTime <= currentTime;
        if (scheduleDate.trim() === '') {
            scheduleDateValidMessage = 'This field is required';
            invalid = true;
        } 
        if (dayInPast) {
            scheduleDateValidMessage = 'This day has past';
            invalid = true;
        }
        if (scheduleTime.trim() === '') {
            scheduleTimeValidMessage = 'This field is required';
            invalid = true;
        }
        if ((dayInPast || currentDate === scheduleDate) && timeInPast) {
            scheduleTimeValidMessage = 'This time has passed';
            invalid = true;
        }
        setScheduleDateValid(scheduleDateValidMessage);
        setScheduleTimeValid(scheduleTimeValidMessage);
        return invalid
    }

    const buyPs5 = async () => {
        const url = "http://localhost:3000/api/schedule";
        const formData = {
            vendor,
            email,
            firstName, 
            lastName,
            phoneNumber, 
            address1,
            address2, 
            city,
            state,
            zip,
            ccFirstName,
            ccLastName,
            cardNumber,
            ccMonth,
            ccYear,
            cvv,
            ccPhoneNumber,
            scheduleDate,
            scheduleTime,
            watcher
        }
        try {
            setIsLoading(true);
            if (watcher) {
                delete formData.scheduleDate;
                delete formData.scheduleTime;
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            await response.json();
            setIsLoading(false);
            toast.success("Jay's bot has been notified about her task!", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            handleClose();
        } catch(err) {
            setIsLoading(false);
            toast.error(err || 'An unknown error has occured', {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }

    return (
        <div>
            <ModalContainer>
                <MuiStepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <MuiStep key={label}>
                      <StepLabel>{label}</StepLabel>
                    </MuiStep>
                  ))}
                </MuiStepper>
                  {activeStep === steps.length ? (
                        <Summary email={email} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} address1={address1} address2={address2} city={city} state={state} zip={zip} ccFirstName={ccFirstName} ccLastName={ccLastName} cardNumber={cardNumber} ccMonth={ccMonth} ccYear={ccYear} cvv={cvv} ccPhoneNumber={ccPhoneNumber} buyPs5={buyPs5} isLoading={isLoading}/>
                  ) : (
                    <FormContainer>
                      {getStepContent(activeStep)}
                      <ButtonContainer>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          size="large"
                        >
                          Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} size="large">
                          Next
                        </Button>
                      </ButtonContainer>
                    </FormContainer>
                  )}
            </ModalContainer>
      </div>
    )
}