import React, { useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode"; // Import jwt_decode
import superheroData from "../superheroes.json";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TableContainer = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const getUserEmailFromSessionStorage = () => {
  const token = sessionStorage.getItem("user");

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.email;
    } catch (e) {
      console.error("Error decoding JWT token:", e);
      return null;
    }
  }
  return null;
};

const SuperheroTable = ({ selectedPublisher }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const userEmail = getUserEmailFromSessionStorage();

    if (!userEmail) {
      navigate("/"); // Use navigate to redirect
    }
  }, [navigate]);

  const filteredSuperheroes = selectedPublisher
    ? superheroData.filter((hero) => hero.publisher === selectedPublisher)
    : superheroData;

  return (
    <TableContainer>
      <h1>Superhero Table</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Superhero</TableHeaderCell>
            <TableHeaderCell>Publisher</TableHeaderCell>
            <TableHeaderCell>Alter Ego</TableHeaderCell>
            <TableHeaderCell>First Appearance</TableHeaderCell>
            <TableHeaderCell>Characters</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredSuperheroes.map((hero, index) => (
            <TableRow key={index}>
              <TableCell>{hero.superhero}</TableCell>
              <TableCell>{hero.publisher}</TableCell>
              <TableCell>{hero.alter_ego}</TableCell>
              <TableCell>{hero.first_appearance}</TableCell>
              <TableCell>{hero.characters}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default SuperheroTable;
