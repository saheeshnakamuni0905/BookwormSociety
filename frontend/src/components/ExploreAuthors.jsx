import React from 'react';
import {  Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '../styles/ExploreAuthors.css'; 

const authorsData = [
  {
    id: 1,
    name: "Ali Hazelwood",
    image: "/AliHazelwood.jpg",
    awards: ["Goodreads Choice Award Nominee"],
    famousBooks: ["The Love Hypothesis", "Love on the Brain"],
    bio: "Ali Hazelwood has emerged as a voice for romantic fiction with a feminist twist, inspired by her own career as a neuroscientist."
  },
  {
    id: 2,
    name: "Emily Henry",
    image: "/EmilyHenry.jpg",
    awards: ["Goodreads Choice Award Winner"],
    famousBooks: ["Beach Read", "People We Meet on Vacation"],
    bio: "Emily Henry has captivated readers worldwide with her compelling narratives that delve into the complexities of life and love."
  },
  {
    id: 3,
    name: "Terry McMillan",
    image: "/TerryMcMillan.jpg",
    awards: ["NAACP Image Award for Outstanding Literary Work"],
    famousBooks: ["Waiting to Exhale", "How Stella Got Her Groove Back"],
    bio: "Terry McMillan has won critical acclaim for her vivid storytelling and her ability to capture the trials and triumphs of contemporary life."
  },
  {
    id: 4,
    name: "David Baldacci",
    image: "/DavidBaldacci.jpg",
    awards: ["National Bestselling Author"],
    famousBooks: ["Absolute Power", "Memory Man"],
    bio: "David Baldacci is a global bestselling author known for his suspense-filled thrillers and engaging mystery novels."
  },
  {
    id: 5,
    name: "Annie Jacobsen",
    image: "/AnnieJacobsen.jpg",
    awards: ["Pulitzer Prize Finalist"],
    famousBooks: ["Area 51", "Operation Paperclip"],
    bio: "Annie Jacobsen is an American investigative journalist and author who writes about war, weapons, security, and secrets."
  },
  {
    id: 6,
    name: "Jeffrey Archer",
    image: "/JeffreyArcher1.jpg",
    awards: ["Lifetime Achievement Award for Literature"],
    famousBooks: ["Kane and Abel", "The Clifton Chronicles"],
    bio: "Jeffrey Archer's storytelling prowess spans thrilling novels and captivating short stories enjoyed by readers worldwide."
   
  },
  // {
  //   id: 7,
  //   name: "Hanya Yanagihara",
  //   image: "/HanyaYanagihara.jpg",
  //   awards: ["Man Booker Prize Finalist"],
  //   famousBooks: ["A Little Life", "The People in the Trees"],
  //   bio: "Hanya Yanagihara is celebrated for her deep, emotional narratives that explore the complexities of relationships and personal histories."
  // },
  {
    id: 8,
    name: "Gabrielle Zevin",
    image: "/GabrielleZevin.jpg",
    awards: ["National Book Award Nominee"],
    famousBooks: ["The Storied Life of A.J. Fikry", "Elsewhere"],
    bio: "Gabrielle Zevin is known for her unique narrative style and touching stories that capture the essence of human emotions."
  },
  // {
  //   id: 9,
  //   name: "Stephen King",
  //   image: "/StephenKing.jpg",
  //   awards: ["Bram Stoker Awards", "Edgar Allan Poe Awards"],
  //   famousBooks: ["The Shining", "IT"],
  //   bio: "Stephen King, the King of Horror, has dominated the genre with his gripping, suspenseful, and deeply psychological novels."
  // }
];


const AuthorPage = () => {
  const navigate = useNavigate();

  const navigateToAuthorPage = (authorId) => {
    window.location.href = `/HTML/author${authorId}.html`;
  };

  return (
    <div className="author-container">
      <header className="author-header">
        <h1>Explore Authors</h1>
        <p>Discover your next favorite author and book.</p>
      </header>

      <div className="author-grid">
        {authorsData.map((author, index) => (
          <Col key={index} className="author-column" onClick={() => navigateToAuthorPage(author.id)}>
            <Card className="author-card">
              <Card.Img variant="top" src={author.image} />
              <Card.Body>
                <Card.Title>{author.name}</Card.Title>
                <Card.Text>{author.description}</Card.Text>
                <Card.Text><strong>Awards:</strong> {author.awards.join(', ')}</Card.Text>
                <Card.Text><strong>Bio:</strong> {author.bio}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

// const AuthorPage = () => {
//   const navigate = useNavigate();
 
//   // Function to navigate to author-specific page
//   const navigateToAuthorPage = (authorId) => {
//     // Using React Router's navigate function to change routes
//     navigate(`/Html/author${authorId}.html`);
//   };
 
//   return (
//   <div className="author-container">
//     <header className="author-header">
//       <h1>Explore Authors</h1>
//       <p>Discover your next favorite author and book.</p>
//     </header>
//   <div className="author-grid">
//         {authorsData.map((author, index) => (
//     <Col key={index} className="author-column" onClick={() => navigateToAuthorPage(author.id)}>
//     <Card className="author-card">
//     <Card.Img variant="top" src={author.image} />
//     <Card.Body>
//     <Card.Title>{author.name}</Card.Title>
//     <Card.Text>{author.description}</Card.Text>
//     <Card.Text><strong>Awards:</strong> {author.awards.join(', ')}</Card.Text>
//     <Card.Text><strong>Bio:</strong> {author.bio}</Card.Text>
//     </Card.Body>
//     </Card>
//     </Col>
//     ))}
//   </div>
// </div>
//   );
// };

export default AuthorPage;
