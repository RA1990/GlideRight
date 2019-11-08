import React from 'react';

function Footer(props) {
  return (

    <React.Fragment>
      <footer className=" mt-5 pt-4 foot page-footer font-large pt-4 navbar-dark bg-dark">
        <div className="container mlFooter">
          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <a href="http://www.rauljaureguicodes.com" target="_blank" rel="noopener noreferrer" className="btn-floating">
                <i className="fa fa-rocket color m-2"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com/in/raul-jauregui/" target="_blank" rel="noopener noreferrer" className="btn-floating">
                <i className="fa fa-linkedin color  m-2"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://github.com/RA1990" target="_blank" rel="noopener noreferrer" className="btn-floating">
                <i className="fa fa-github color m-2"> </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="float-right contact">
          <h5>Contact</h5>
          <div><a href="mailto:felx90@outlook.com" className="sociallink"><i className="fa fa-envelope color">felx90@outlook.com</i></a></div>
          <div><a href="tel:951-758-3340"><i className="fa fa-phone color">+1(951)-758-3340</i></a></div>
        </div>
        <div className="footer-copyright text-center py-3 copy"><a className="color" href="http://www.rauljaureguicodes.com" target="_blank" rel="noopener noreferrer"><i className="color">© 2019 Copyright:rauljaureguicodes.com</i></a>
        </div>

      </footer>
    </React.Fragment>
  );

}

export default Footer;
