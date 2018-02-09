import React from "react";
import { Field, reduxForm } from "redux-form";

const NewGoalForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        I want to get better at...
        <Field
          name="subject"
          component="input"
          type="text"
          placeholder="basket weaving"
        />. By putting in the time, practicing and working hard ~~MYSUBJECT~~
        can get easier and if I am persistent I can achieve mastery.
        <h3>The Plan</h3>
        <Field name="period" component="select">
          <option value="Every day">Every Day</option>
          <option value="Every week">Every Week</option>
          <option value="Today">Today</option>
          <option value="This week">This Week</option>
        </Field>
        I will invest
        <Field name="targetTime" component="select">
          <option value={1}>1 hour</option>
          <option value={2}>2 hours</option>
          <option value={3}>3 hours</option>
          <option value={4}>4 hours</option>
          <option value={5}>5 hours</option>
          <option value={6}>6 hours</option>
          <option value={7}>7 hours</option>
          <option value={8}>8 hours</option>
          <option value={9}>9 hours</option>
          <option value={10}>10 hours</option>
          <option value={11}>11 hours</option>
          <option value={12}>12 hours</option>
          <option value={13}>13 hours</option>
          <option value={14}>14 hours</option>
          <option value={15}>15 hours</option>
          <option value={16}>16 hours</option>
          <option value={17}>17 hours</option>
          <option value={18}>18 hours</option>
          <option value={19}>19 hours</option>
          <option value={20}>20 hours</option>
          <option value={21}>21 hours</option>
          <option value={22}>22 hours</option>
          <option value={23}>23 hours</option>
          <option value={24}>24 hours</option>
          <option value={25}>25 hours</option>
          <option value={26}>26 hours</option>
          <option value={27}>27 hours</option>
          <option value={28}>28 hours</option>
          <option value={29}>29 hours</option>
          <option value={30}>30 hours</option>
          <option value={31}>31 hours</option>
          <option value={32}>32 hours</option>
          <option value={33}>33 hours</option>
          <option value={34}>34 hours</option>
          <option value={35}>35 hours</option>
          <option value={36}>36 hours</option>
          <option value={37}>37 hours</option>
          <option value={38}>38 hours</option>
          <option value={39}>39 hours</option>
          <option value={40}>40 hours</option>
          <option value={41}>41 hours</option>
          <option value={42}>42 hours</option>
          <option value={43}>43 hours</option>
          <option value={44}>44 hours</option>
          <option value={45}>45 hours</option>
          <option value={46}>46 hours</option>
          <option value={47}>47 hours</option>
          <option value={48}>48 hours</option>
          <option value={49}>49 hours</option>
          <option value={50}>50 hours</option>
        </Field>
        in creating a more valuable and skilled version of myself that I will be
        able to look back on and be proud of. It starts now!
        <button type="submit">Go!</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "new-goal" })(NewGoalForm);
