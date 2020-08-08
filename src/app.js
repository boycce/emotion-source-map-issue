/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import './style.css'


const Header = ({ children }) => (
  <HeaderCss>
    some header text..
    {children}
  </HeaderCss>
)

const Nav = () => (
  <div css={navCss}>some nav text..</div>
)

const HeaderCss = styled.div`

  color: green;
`

const navCss = css({
  color: 'blue'
})

export default function() {
  console.log(1)
  return (
    <div>
      <div>some body text..</div>
      <Header></Header>
      <Nav></Nav>
    </div>
  )
}
