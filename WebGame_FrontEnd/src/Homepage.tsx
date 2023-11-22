const Homepage = () => {
    const cards = [
      { title: 'News 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'News 2', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'News 3', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
      // Add more objects as needed
    ];
  
    return (
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="form-label">Latest News</div>
          <div className="row">
            {cards.map((item, index) => (
              <div className="col-lg-4" key={index}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">{item.title}</div>
                  </div>
                  <div className="card-body">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-3 text-center">
            <div className="h3">About Game</div>
            <p>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Homepage;
  