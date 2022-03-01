import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";

export default function AlbumPreview({
  albums,
  setSelectedAlbum,
  handlePagination,
}) {
  if (!albums) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Your Saved Albums</h3>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {albums?.map((album) => {
          // let album = a.album;
          let id = album.id;

          return (
            <Card
              key={id}
              style={{ width: "14rem", backgroundColor: "black" }}
              onClick={() => setSelectedAlbum(id)}
              border="secondary"
            >
              <Card.Img variant="top" src={album.images[1].url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.artists[0].name}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <Container className="my-2 d-flex justify-content-between">
        <Button
          variant="secondary"
          className="mx-auto my-auto"
          onClick={() => {
            handlePagination("previous");
          }}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          className="mx-auto my-auto"
          onClick={() => {
            handlePagination("next");
          }}
        >
          Next
        </Button>
      </Container>
    </div>
  );
}

// {!albumSearch ? (
//     <div>
//   <h3>Your Saved Albums</h3>
//   <div
//     className="container"
//     style={{
//       display: "flex",
//       flexWrap: "wrap",
//       flexDirection: "row",
//       justifyContent: "space-evenly",
//     }}
//   >
//     {userSavedAlbums?.albums?.map((a) => {
//       let album = a.album;
//       let id = album.id;

//       return (
//         // <div
//         //   className="pt-2 w-25 h-30"
//         //   style={{
//         //     border: "1px solid white",
//         //   }}
//         //   key={id}
//         // >
//         //   <p>{album.artists[0].name}</p>
//         //   <img alt={album.name} src={album.images[2].url}></img>
//         //   <p>{album.name}</p>
//         // </div>
//         <Card
//           key={id}
//           style={{ width: "14rem", backgroundColor: "black" }}
//           onClick={() => setSelectedAlbum(id)}
//         >
//           <Card.Img variant="top" src={album.images[1].url} />
//           <Card.Body>
//             <Card.Title>{album.name}</Card.Title>
//             <Card.Text>{album.artists[0].name}</Card.Text>
//             {/* <Button variant="primary">Go somewhere</Button> */}
//           </Card.Body>
//         </Card>
//       );
//     })}
//   </div>
//   <Container className="my-2 d-flex justify-content-between">
//     <Button
//       variant="secondary"
//       className="mx-auto my-auto"
//       onClick={() => {
//         handlePagination("previous");
//       }}
//     >
//       Previous
//     </Button>
//     <Button
//       variant="secondary"
//       className="mx-auto my-auto"
//       onClick={() => {
//         handlePagination("next");
//       }}
//     >
//       Next
//     </Button>
//   </Container>
// </div>
//   ) : (
//     <div>
//       {" "}
//       <div
//         className="container"
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           flexDirection: "row",
//           justifyContent: "center",
//         }}
//       >
//         {searchedAlbums?.albums?.map((a) => {
//           let id = a.id;

//           return (
//             <Card
//               key={id}
//               style={{ width: "18rem", backgroundColor: "black" }}
//             >
//               <Card.Img variant="top" src={a.images[1].url} />
//               <Card.Body>
//                 <Card.Title>{a.name}</Card.Title>
//                 <Card.Text>{a.artists[0].name}</Card.Text>
//                 {/* <Button variant="primary">Go somewhere</Button> */}
//               </Card.Body>
//             </Card>
//             // <div
//             //   className="pt-2 w-25 h-30"
//             //   style={{ border: "1px solid white" }}
//             //   key={id}
//             //   onClick={() => setSelectedAlbum(a.id)}
//             // >
//             //   <p>{a.artists[0].name}</p>
//             //   <img alt={a.name} src={a.images[2].url}></img>
//             //   <p>{a.name}</p>
//             // </div>
//           );
//         })}
//       </div>
//     </div>
//   )}
