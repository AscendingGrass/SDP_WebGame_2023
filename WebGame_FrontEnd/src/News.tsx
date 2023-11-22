const News = () => {
    const cardData = [
      { title: 'Breaking News 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Technology Update', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'Sports Highlights', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
      { title: 'Entertainment Buzz', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Health and Wellness', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'Travel Destinations', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
      { title: 'Business Insights', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Science Discoveries', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'Fashion Trends', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
      { title: 'Food and Cuisine', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Movie Reviews', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'Book Recommendations', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    ];
  
    return (
      <div className="container"  style={{ overflowX: 'auto' }}>
        <div className="row mb-3">
          {cardData.map((item, index) => (
            <div className="col-lg-4 mb-3" key={index}>
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
      </div>
    );
  }
  
  export default News;
  