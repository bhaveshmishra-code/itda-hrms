import React from 'react'
import styled from 'styled-components'
import { getProfileQuery, QueryKey } from 'query/query'
import { useQuery } from 'react-query'
import Loading from './Loading'

const Page = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ProfilePage = styled.div`
  .photo {
    display: flex;
    justify-content: center;
    margin: 16px 0;
  }
  .row {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .label {
    font-size: 0.75rem;
    color: #757575;
  }

  .value {
    font-weight: 500;
    color: #263238;
  }
`

export default function Profile({ user }) {
  const { data, isLoading } = useQuery(QueryKey.PROFILE_QUERY, () =>
    getProfileQuery(user)
  )
  if (isLoading) {
    return <Loading />
  }

  // console.log(data)
  return (
    <Page>
      <ProfilePage>
        <div className="photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.image} alt="image" />
        </div>

        <div className="row">
          <div className="label">NAME</div>
          <div className="value">{data.employeeName}</div>
        </div>
        <div className="row">
          <div className="label">DESIGNATION</div>
          <div className="value">{data.designation}</div>
        </div>
        <div className="row">
          <div className="label">DEPARTMENT</div>
          <div className="value">{data.department}</div>
        </div>
        <div className="row">
          <div className="label">PLACE OF POSTING</div>
          <div className="value">{data.placeOfPosting}</div>
        </div>
        <div className="row">
          <div className="label">PHONE</div>
          <div className="value">{data.phone}</div>
        </div>
        <div className="row">
          <div className="label">EMAIL</div>
          <div className="value">{data.email}</div>
        </div>
        <div className="row">
          <div className="label">REPORTING AUTHORITY</div>
          <div className="value">{data.reportingAuthority}</div>
        </div>
      </ProfilePage>
    </Page>
  )
}
