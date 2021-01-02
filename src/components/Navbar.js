import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
	return (
		<div className="Navbar">
			<nav className="navbar navbar-expand-lg bg-dark">
				<div className="container">
					<Link to="/" className="navbar-brand">
						Online Judge
					</Link>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to="/problems" className="link">
									Problems
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/submissions" className="link">
									Submissions
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link to="/login" className="link">
									Login
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
