import React from 'react';

const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((init, next) => init + next.exercises, 0);
  return (
    <p>
      <b>The total number of exercises{sum}</b>
    </p>
  );
};

const Course = ({ course }) => {
  
  return (
   <>
    <Header  title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
   </>
  );
};

export default Course;