import React from "react";

const NewsItems =(props)=> {
 
    let { title, description, imageurl, newsUrl, author, date,source } =props;
    return (
      
      <div className="my-3">
        <div className="card">
          <div 
          style={
            {
              display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0'
            }
          }>
          <span className="badge rounded-pill bg-danger">
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
        
          <img
            src={
              imageurl
                ? imageurl
                : "https://www.coindesk.com/resizer/C8yqxagJEupXxE6r3FGYY8q6UrM=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/BAS6BC7ICZEKNK6NMHVIHJEAFA.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
           
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
 
}

export default NewsItems;
