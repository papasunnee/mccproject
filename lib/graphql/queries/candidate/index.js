/**
* GraphQl Candidate Queries
*/
import gql from 'graphql-tag'

export const CANDIDATE_ISAUTHENTICATED_QUERY = gql`
  query {
    candidateIsAuthenticated
  }
`

export const HOME_VIEWER_CANDIDATE_QUERY = gql`
  query {
    price{
      _id
      mccPrice
      currency
      symbol
    }
    viewerCandidate {
      candidate {
        _id
        name
        email
        isActivated
      }
    }
  }
`

export const PAYMENT_PAGE_QUERY = gql`
  query ViewerCandidateQuery{
    currentTime
    viewerCandidate {
      candidate {
        _id
        payments(sort: CREATEDAT_DESC){
          _id
          paystackReference
          createdAt
          transactionDate
          amount
          currency
          testCode {
            _id
            code
          }
        }
      }
    }
  }
`

export const CANDIDATE_FIND_COUPON_QUERY = gql`
  query($coupon: String!){
    candidateFindCoupon(coupon: $coupon){
      _id
      discount
    }
  }
`
