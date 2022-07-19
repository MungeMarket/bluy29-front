import { gql, useMutation } from "@apollo/client";

//회원가입
export const SIGN_UP = gql`
  mutation createAccountMutation(
    $id: String!
    $pw: String!
    $nickname: String!
    $phone: String!
    $mAgree: Boolean!
    $zipCode: String!
    $addr: String!
    $addrDetail: String!
  ) {
    createAccount(
      input: {
        id: $id
        pw: $pw
        nickname: $nickname
        phone: $phone
        mAgree: $mAgree
        zipCode: $zipCode
        addr: $addr
        addrDetail: $addrDetail
      }
    ) {
      status
      error
    }
  }
`;

//로그인, 토큰 발급
export const LOG_IN = gql`
  mutation logInMutation($id: String!, $pw: String!) {
    login(input: { id: $id, pw: $pw }) {
      status
      error
      token
    }
  }
`;

//매물 등록
export const ADD_PRODUCT = gql`
  mutation createHousingMutation(
    $rentType: RentTypeInput!
    $deposit: Float!
    $monthly: Float
    $price: Float
    $manageFee: Float!
    $manageInclude: [ManageIncludeInput!]!
    $manageNotInclude: [ManageNotIncludeInput!]!
    $parkingArea: Float!
    $parkingFee: Float
    $shortTerm: Boolean!
    $images: [HousingImageInput!]!
    $housingName: String
    $roomType: RoomTypeInput!
    $totalFloor: Float
    $floor: String
    $areaSize: Float!
    $realSize: Float!
    $roomCount: Float!
    $bathRoomCount: Float!
    $direction: Direction!
    $security: [RentSecurityInput!]
    $heating: Hitting!
    $builtIn: Boolean!
    $builtInDetail: String!
    $elevator: Boolean!
    $veranda: Boolean!
    $availableMoveIn: DateTime!
    $mainUse: String!
    $approvalDate: DateTime!
    $options: [RentOptionInput!]
    $title: String!
    $detailContent: String!
    $addr: String!
    $addrDetail: String
    $lat: Float!
    $long: Float!
  ) {
    createHousing(
      input: {
        rentType: $rentType
        deposit: $deposit
        monthly: $monthly
        price: $price
        manageFee: $manageFee
        manageInclude: $manageInclude
        manageNotInclude: $manageNotInclude
        parkingArea: $parkingArea
        parkingFee: $parkingFee
        shortTerm: $shortTerm
        images: $images
        housingName: $housingName
        roomType: $roomType
        totalFloor: $totalFloor
        floor: $floor
        areaSize: $areaSize
        realSize: $realSize
        roomCount: $roomCount
        bathRoomCount: $bathRoomCount
        direction: $direction
        heating: $heating
        builtIn: $builtIn
        builtInDetail: $builtInDetail
        elevator: $elevator
        veranda: $veranda
        security: $security
        availableMoveIn: $availableMoveIn
        mainUse: $mainUse
        approvalDate: $approvalDate
        options: $options
        title: $title
        detailContent: $detailContent
        addr: $addr
        addrDetail: $addrDetail
        lat: $lat
        long: $long
      }
    ) {
      status
      error
    }
  }
`;

//핸드폰 인증, 본인인증 후
export const VERIFY_TEST = gql`
  mutation verifyTest {
    verifyPhone {
      error
      status
    }
  }
`;

// 부동산 매물 정보 받아오기
export const FIND_IN_MAP = gql`
  query readMapHousingQuery(
    $swLat: Float!
    $swLong: Float!
    $neLat: Float!
    $neLong: Float!
  ) {
    readMapHousing(
      input: { swLat: $swLat, swLong: $swLong, neLat: $neLat, neLong: $neLong }
    ) {
      error
      status
      totalPage
      housings {
        idx
        lat
        long
        title
        deposit
      }
    }
  }
`;
