import React from 'react';

export default class Jumbo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 'show'
    };
    this.modal = this.modal.bind(this);
  }
  modal() {
    this.setState({ modal: 'hide' });
  }

  render() {
    return (
      <React.Fragment>
        <div className="modal" id={this.state.modal} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modaltop">
              <div className="modal-body">
                <p className="mr-5">This is a demo site there are no products for sale</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.modal} type="button" className="btn btn-secondary modalButton" data-dismiss="modal">I Agree</button>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron jumbotron Jumbo">
          <div className="overlay"></div>
          <div className="container">
            <h1 className="display-3 mb-1">JUST <br></br>SKATE</h1>
            <p className="lead">start<span> your glide</span></p>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
