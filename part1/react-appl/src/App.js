

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  
  

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

const Total = props => {
  console.log(props);
  return <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>;
}

const Header = props => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
}

const Part = props => {
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
    </div>
  );
};

const Content = props => {

  return(
    <div>
      <Part   part1={props.parts.parts[0].name} exercises1={props.parts.parts[0].exercises}/>
      <Part   part1={props.parts.parts[1].name} exercises1={props.parts.parts[1].exercises}/>
      <Part   part1={props.parts.parts[2].name} exercises1={props.parts.parts[2].exercises}/>
    </div>
  );
};

export default App;
