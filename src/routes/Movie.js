import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const GET_MOVIE = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            id
            title
            medium_cover_image
            rating
            '''
            뒤에 @client 를 붙여주면 localonlyfield 가 되는데 만약 cache에 이 data가 없어도 api에서 찾지 않는다.
            '''
            isLiked @client
        }
    }
`

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`

const Image = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`

export default function Movie() {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        },
    })
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
                <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
                <button>{data?.movie?.isLiked ? "Ulike" : "Like"}</button>
            </Column>
            <Image bg={data?.movie?.medium_cover_image} />
        </Container>
    )
}
