import {gql} from '@apollo/client';

export const GET_DATA_LEFT = gql`
    query getAllContentData{
        getAllContentData{
            leftheading
            leftpara
        }
    }
`;

export const GET_DATA_RIGHT = gql`
    query getAllContentData{
        getAllContentData{
            rightheading
            rightpara
        }
    }
`;