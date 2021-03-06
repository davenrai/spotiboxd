import { Button, Card, Container } from "react-bootstrap";

export default function AlbumPreview({
  albums,
  setSelectedAlbum,
  handlePagination,
  isUserPreview,
}) {
  if (!albums) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>
        <u>{isUserPreview ? "Your Saved Albums" : "Search Results"}</u>
      </h3>
      {albums && (
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
            let id = album.id;

            return (
              <Card
                key={id}
                style={{ width: "14rem", backgroundColor: "black" }}
                onClick={() => setSelectedAlbum(id)}
                border="secondary"
                className="my-2 album-preview"
              >
                <Card.Img variant="top" src={album?.images[1]?.url ?? ""} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <Card.Text>{album.artists[0].name}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
      {isUserPreview && (
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
      )}
    </div>
  );
}
