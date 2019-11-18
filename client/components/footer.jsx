import React from 'react';

function Footer(props) {
  return (

    <React.Fragment>
      <footer className=" mt-5 pt-4 foot page-footer font-large pt-4 navbar-dark bg-dark">
        <div className="container ml-footer">
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
          <h5 className="contact-header">Contact</h5>
          <div className="fa fa-envelope color email-link"><a href="mailto:felx90@outlook.com" className="sociallink"><i className="font-fam color">felx90@outlook.com</i></a></div>
          <div className="fa fa-phone color phone-link"><a href="tel:951-758-3340"><i className="font-fam color" >+1(951)-758-3340</i></a></div>
        </div>
        <div className="footer-copyright text-center py-3 copy foot-link-to-portfolio"><a className="color" href="http://www.rauljaureguicodes.com" target="_blank" rel="noopener noreferrer"><i className="color font-fam">© 2019 Copyright:rauljaureguicodes.com</i></a>
        </div>

      </footer>
    </React.Fragment>
  );

}

export default Footer;
