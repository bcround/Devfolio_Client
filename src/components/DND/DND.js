import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from 'utils';
import { func } from 'prop-types';
import { Container, Image, SVGIcon } from 'components';
import { Field } from 'formik';
import ajax from 'apis/ajax';

const DNDInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 9999;
`;

const Display = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background: ${color.mainColor};
  border-radius: 5px;
  position: absolute;
  top: 0;
  font-size: 3rem;
  z-index: -2;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;
const HoverDisplay = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #5db3fd;
  font-size: 3rem;
  border: 1px dashed ${color.mainColor};
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

const RoundBackground = styled.div`
  width: 80px;
  height: 80px;
  background: #a9c1ff;
  position: absolute;
  border-radius: 50%;
  z-index: -2;
`;

const HoverDNDMessage = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${color.white};
  margin-top: 30px;
`;

const DND = ({ setFieldValue }) => {
  const [src, setSrc] = useState(null);
  const [alt, setAlt] = useState(null);
  const [isDragged, setIsDragged] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const onDragOverHandler = e => {
    e.preventDefault();
    setIsDragged(true);
    setIsUploaded(true);
  };

  const onDragLeaveHandler = e => {
    setIsDragged(false);
    setIsUploaded(false);
  };

  const onChange = async e => {
    const { src, alt } = await uploadImage(e.target.files[0]);
    setSrc(src);
    setAlt(alt);
    setIsDragged(false);
    setFieldValue('thumbnail', src);
  };

  // TODO: 후에 컨테이너에서 관리, axios를 ajax로도 변경
  const uploadImage = async file => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await ajax.postImage(formData);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container
      display="inline-block"
      width={400}
      height={400}
      border="1px solid #EAEAEA"
      borderRadius="5px"
      position="relative"
    >
      <Field
        type="file"
        name="imagePath"
        component={DNDInput}
        onChange={onChange}
        id="imagePath"
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        accept="image/jpeg, image/png, image/jpg, image/webp"
        multiple
        required
      />
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          object-fit="cover"
          position="absolute"
          top="0"
          left="0"
          zIndex={-1}
          borderRadius="5px"
        />
      ) : null}
      {isUploaded ? null : (
        <Display>
          <RoundBackground />
          <SVGIcon type="Camera" />
        </Display>
      )}
      {isDragged ? (
        <HoverDisplay>
          <SVGIcon type="Folder" />
          <HoverDNDMessage>Drag &amp; Drop your files here</HoverDNDMessage>
        </HoverDisplay>
      ) : null}
    </Container>
  );
};

DND.defaultProps = {};

DND.propTypes = {
  /** file input의 값을 formik의 values로 설정해주는 함수입니다. */
  setFieldValue: func,
};

export default DND;
