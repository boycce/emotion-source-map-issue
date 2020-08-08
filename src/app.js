/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import './style.css'

const Header = ({ children }) => (
  <div css={headerCss}>
    some header text..
    {children}
  </div>
)

const Nav = () => (
  <div css={navCss}>some nav text..</div>
)

const headerCss = css`
  color: green;
`

const navCss = css({
  color: 'blue'
})

export default function() {
  return (
    <div>
      <div>some body text..</div>
      <Header></Header>
      <Nav></Nav>
    </div>
  )
}
