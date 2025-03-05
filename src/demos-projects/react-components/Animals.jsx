import React, { useState } from "react";

const Animals = () => {
  // Hardcoded JSON array
  const initialAnimals = [
    { id: 1, name: "Lola", type: "Dog" },
    { id: 2, name: "Socks", type: "Cat" },
    { id: 3, name: "Leo", type: "Cat" },
    { id: 4, name: "Pumpkin", type: "Dog" },
    { id: 5, name: "Pudding", type: "Dog" },
    { id: 6, name: "Pinto", type: "Dog" },
    { id: 7, name: "Bootsie", type: "Cat" }
  ];

  // Setting initial state with the hardcoded array
  const [animalList, setAnimalList] = useState(initialAnimals);

  // Function to update an animal's name
  const updateAnimalName = (id, newName) => {
    setAnimalList(animalList.map(animal =>
      animal.id === id ? { ...animal, name: newName } : animal
    ));
  };

  return (
    <div>
      <h2>React Project: Animals List</h2>
      <p>This project allows you to update an animal's name.</p>
      <p>Functionality to change the type of pet and add more coming soon!</p>
      <br></br>
      {animalList.map(animal => (
        <AnimalItem key={animal.id} animal={animal} updateAnimalName={updateAnimalName} />
      ))}
    </div>
  );
};

const AnimalItem = ({ animal, updateAnimalName }) => {
  const [newName, setNewName] = useState(animal.name);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAnimalName(animal.id, newName);
  };

  return (
    <div>
      <p>{animal.name} - Type: {animal.type}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newName} onChange={handleChange} />
        <button class="btn btn-secondary" type="submit">Update Name</button>
      </form>
    </div>
  );
};

export default Animals
