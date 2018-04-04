import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  height: 100%;
`

export const RaisedBox = styled.div`
  background: ${p => p.theme.white};
  border-radius: 4px;
  box-shadow: rgba(0,0,0,0.12) 0 1px 1px 0;
`

export const FlexVerticallyCenter = styled.div`
  /* format is FlexVerticallyCenter > 
    [LEFT SIDE [ITEM 1] [ITEM 2] ]  --------- [RIGHT SIDE [ITEM 3] [ITEM 4[ITEM 5]]]
  */
  display: flex;
  justify-content: space-between;
  align-items: center;
  &&& > *, &&& > * > * { /* all children and grandchildren must have margins removed for centering and displayed in the same line */
    display: inline-block;
    margin: 0 6px;
  }
  &&& > * { /* direct children must be flex for centered vertical */
    display: flex;
    align-items: center;
    &:first-child {
      margin-left: -6px;
    }
    &:last-child {
      margin-right: -6px;
    }
  }
`