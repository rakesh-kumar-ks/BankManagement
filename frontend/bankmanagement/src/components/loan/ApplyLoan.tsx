import { useEffect, useState } from 'react';
import '../../index.css'
import { useForm ,Controller} from "react-hook-form";
import { Button } from 'react-bootstrap';

function ApplyLoan() {

  const {  handleSubmit, control, formState: { errors },} = useForm(); 
  const [showEducationInputs,setShowEducationInputs ] = useState(false);
  const [showPersonalInputs,setShowPersonalInputs ] = useState(false);
  const [intrest,setIntrest]= useState('');
  const handleDropdownChange = (selectedValue:string) => {
    setShowEducationInputs(selectedValue === 'education');
    setShowPersonalInputs(selectedValue==='personal/home')
    if(selectedValue === 'education'){
      setIntrest(6);
      alert(intrest)
    }else if(selectedValue==='personal/home'){
      setIntrest(10);
      alert(intrest)
    } else{
      setIntrest('');
      alert(intrest)
    }
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
  const currentDay = currentDate.getDate();
  const maxDate = `${currentYear}-${currentMonth
    < 10 ? '0' + currentMonth : currentMonth}
    -${currentDay < 10 ? '0' + currentDay : currentDay}`;
  
    interface loan{
      loantype:string,
      coursefee:string,
      course:string,
      fathername:string,
      fatheroccupation:string,
      annualincome:string,
      companyname:string,
      Designation:string,
      totalexpirence:number,
      currentcompanyexp:string,
      loanamount:string,
      loanapplydate:string,
      rateofintrest:string,
      loanduration:string,
 }

    useEffect(()=>{
    console.log(intrest)
    },[intrest])

 const submitHandler= async(data:any) =>{

  const loanParams:loan = {
      loantype:data.loantype,
      coursefee:data.coursefee,
      course:data.course,
      fathername:data.fathername,
      fatheroccupation:data.fatheroccupation,
      annualincome:data.annualincome,
      companyname:data.companyname,
      Designation:data.Designation,
      totalexpirence:data.totalexpirence,
      currentcompanyexp:data.currentcompanyexp,
      loanamount:data.loanamount,
      loanapplydate:data.loanapplydate,
      rateofintrest:data.rateofintrest,
      loanduration:data.loanduration
  }
  console.log(loanParams)

 }

  console.log(errors)

  return (
    <div className="apply-loan-container">
        <h3>Apply Loan</h3>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="d-flex">
                <div className="loan-col">
                    <div className="form-control">
                        <label>Loan Type</label>
                        <Controller
                          name="loantype"
                          control={control}
                          rules={{required:true}}
                          render={({ field }) => (
                            <select {...field} onChange={(e) => {handleDropdownChange(e.target.value)}}>
                            <option value=''>Select Loan Type</option>
                            <option value='education'>Education</option>
                            <option value='personal/home'>Personal/Home</option>
                        </select>
                              )}
                          />
                        {errors.loantype?.type === "required" && (
                          <small className="field-error">Loan type is required</small>
                          )}
                    </div> 
                    {showEducationInputs && (<>
                        <div className="form-control">
                          <label>Course Fee</label>
                          <Controller
                            name="coursefee"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.coursefee?.type === "required" && (
                          <small className="field-error">Course Fee is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Course</label>
                          <Controller
                            name="course"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.course?.type === "required" && (
                          <small className="field-error">Course is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Father Name</label>
                          <Controller
                            name="fathername"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.fathername?.type === "required" && (
                          <small className="field-error">Fathername is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Father Occupation</label>
                          <Controller
                            name="fatheroccupation"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.fatheroccupation?.type === "required" && (
                          <small className="field-error">Fatheroccupation is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Annual Income</label>
                          <Controller
                            name="annualincome"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.annualincome?.type === "required" && (
                          <small className="field-error">Annual Income is required</small>
                          )}
                        </div>
                        </>
                     )}

                     {showPersonalInputs && (<>
                      <div className="form-control">
                          <label>Annual Income</label>
                          <Controller
                            name="annualincome"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.annualincome?.type === "required" && (
                          <small className="field-error">aAnnual Income is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Comapny Name</label>
                          <Controller
                            name="companyname"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.companyname?.type === "required" && (
                          <small className="field-error">Company Name is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Designation</label>
                          <Controller
                            name="designation"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.designation?.type === "required" && (
                          <small className="field-error">Designation is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Total EXp</label>
                          <Controller
                            name="totalexpirence"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.totalexpirence?.type === "required" && (
                          <small className="field-error">Total Expirence is required</small>
                          )}
                        </div>
                        <div className="form-control">
                          <label>Exp With Current Company</label>
                          <Controller
                            name="currentcompanyexp"
                            control={control}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.currentcompanyexp?.type === "required" && (
                          <small className="field-error">Current Company exp is required</small>
                          )}
                        </div>
                     </>)}
                </div>
                <div className="loan-col">
                <div className="form-control">
                          <label>Loan Amount</label>
                          <Controller
                            name="loanamount"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.loantype?.type === "required" && (
                          <small className="field-error">Loan type is required</small>
                          )}
                        </div>
                         <div className="form-control">
                                <label>Loan Apply Date</label>
                              <Controller
                                name="loanapplydate"
                                control={control}
                                rules={{
                                  required: true,
                                  validate: (value) => {
                                    const selectedDate = new Date(value);
                                    return selectedDate <= currentDate;
                                  }}}
                                render={({ field }) => (
                                  <input
                                    type="date"
                                    id="loanapplydate"
                                    max={maxDate}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.loanapplydate?.type === "required" && (
                                <small className="field-error">Loan apply date is required</small>
                                )}
                              {errors.loanapplydate?.type === "validate" && (
                                <small className="field-error">Loan apply date cannot be in the future</small>
                                )}
                          </div>
                        <div className="form-control">
                          <label>Rate of Interest</label>
                          <Controller
                            name="rateofintrest"
                            control={control}
                            defaultValue={intrest}
                            rules={{required: true}}
                            render={({ field }) => <input {...field} type="text" />}
                          />
                           {errors.rateofintrest?.type === "required" && (
                          <small className="field-error">Rate of interest is required</small>
                          )}
                        </div>
                        <div className="form-control">
                        <label>Duration of the Loan</label>
                        <Controller
                          name="loanduration"
                          control={control}
                          rules={{required:true}}
                          render={({ field }) => (
                            <select {...field} onChange={(e) => e.target.value}>
                            <option value=''>Select Loan Duration</option>
                            <option value='5'>5 Y</option>
                            <option value='10'>10 Y</option>
                            <option value='15'>15 Y</option>
                            <option value='20'>20 Y</option>
                        </select>
                              )}
                          />
                        {errors.loanduration?.type === "required" && (
                          <small className="field-error">Loan Duration is required</small>
                          )}
                    </div> 
                </div>
                </div>
                <div className="d-flex-row">
                <Button type="submit" variant="primary" className="mt-3">
               Submit
             </Button>
                </div>
            </form>
    </div>
  )
}

export default ApplyLoan