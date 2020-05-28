import React, { useState } from "react"
import classNames from "classnames"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import Link from "../LocaleLink"
import TBTCLogo from "../svgs/TBTCLogo"

const NavLink = ({ url, label, ...other }) => {
  if (/^http/.test(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    )
  }

  return (
    <Link to={url} {...other}>
      {label}
    </Link>
  )
}

NavLink.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
}

const HeaderTemplate = ({ nav_items: navItems, dapp_link: dappLink }) => {
  const [showMenu, setMenu] = useState(false)
  const toggleMenu = () => {
    setMenu(! showMenu)
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link className="logo" to="/">
          <TBTCLogo width="165" />
        </Link>

        <div className={classNames("menu", { "open": showMenu })}>
          <button className={classNames("menu-label", { "open": showMenu })}
            onClick={toggleMenu}>
              Navigation
          </button>
          <ul className="nav-left">
            {navItems.map((item, i) => (
              <li key={`nav-item-${i}`}>
                <NavLink {...item} activeClassName="active" />
              </li>
            ))}
          </ul>
          <ul className="nav-right">
            <li><a className="mint-button" href={dappLink.url} target="_blank" rel="noopener noreferrer">{dappLink.label}</a></li>
            <li><a className="site-repo-link" href="https://github.com/keep-network/tbtc-website" target="_blank" rel="noopener noreferrer">Repository</a></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

HeaderTemplate.propTypes = {
  nav_items: PropTypes.array,
  dapp_link: PropTypes.object,
}

export const query = graphql`
  query Header {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "header-nav" } } }
    ) {
      edges {
        node {
          fields {
            locale
          }
          frontmatter {
            nav_items {
              label
              url
            }
            dapp_link {
              label
              url
            }
          }
        }
      }
    }
  }
`

const Header = ({ locale = "en" }) => (
  <StaticQuery
    query={query}
    render={data => {
      const match = data.allMarkdownRemark.edges
        .find(e => e.node.fields.locale === locale)
      return <HeaderTemplate {...match.node.frontmatter} />
    }}
  />
)

Header.propTypes = {
  locale: PropTypes.string
}

export default Header
