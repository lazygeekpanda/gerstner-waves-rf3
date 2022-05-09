import React from 'react'

import * as S from './Credits.styled'

const Credits: React.FC = () => {
  return (
    <S.Wrapper>
      <p>
          Used
          <a
            href="https://sketchfab.com/3d-models/cargo-ship-c95d341642c949bd85a03c97a15f81c3"
            target="_blank"
            rel="noreferrer"
          >
            Cargo Ship Model
          </a>
          by
          <a
            href="https://sketchfab.com/AkaIntensity"
            target="_blank"
            rel="noreferrer"
          >
            AkaIntensity / Sketchfab
          </a>
          licensed under
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC Attribution
          </a>
        </p>
    </S.Wrapper>
  )
}

export default Credits
