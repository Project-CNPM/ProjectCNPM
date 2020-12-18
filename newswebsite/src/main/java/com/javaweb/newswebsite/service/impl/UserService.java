package com.javaweb.newswebsite.service.impl;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.newswebsite.converter.CommentConverter;
import com.javaweb.newswebsite.dto.CommentDTO;
import com.javaweb.newswebsite.entity.CommentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.javaweb.newswebsite.converter.UserConverter;
import com.javaweb.newswebsite.dto.UserDTO;
import com.javaweb.newswebsite.entity.UserEntity;
import com.javaweb.newswebsite.repo.UserRepository;
import com.javaweb.newswebsite.service.IUserService;


@Service
public class UserService implements IUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserConverter userConverter;

	@Autowired
	private CommentConverter commentConverter;

	@Override
	public UserDTO save(UserDTO userDto) {
		UserEntity newUserEntity = new UserEntity();
		if (userDto.getId() != null) { // update
			UserEntity oldUserEntity = userRepository.findUserById(userDto.getId()).get();
			newUserEntity = userConverter.toEntity(userDto, oldUserEntity);
		} else { // insert
			newUserEntity = userConverter.toEntity(userDto);
		}
		newUserEntity = userRepository.save(newUserEntity);
		return userConverter.toDTO(newUserEntity);
	}

	@Override
	public void delete(Long[] ids) {
		for (long items : ids) {
			userRepository.deleteById(items);
		}

	}

	@Override
	public List<UserDTO> findAll(Pageable pageable) {
		List<UserDTO> userDTO = new ArrayList<>();
		List<UserEntity> userEntity = userRepository.findAll(pageable).getContent();
		for(UserEntity item : userEntity) {
			UserDTO dto = userConverter.toDTO(item);
			userDTO.add(dto);
		}
		return userDTO;
	}

	@Override
	public int totalUser() {
		return (int) userRepository.count();
	}

	@Override
	public List<UserDTO> findByKeyWord(String keyword, Pageable pageable) {
		List<UserDTO> userDTO = new ArrayList<>();
		List<UserEntity> userEntity = userRepository.search(keyword,pageable).toList();
		if(keyword != null) {
			for(UserEntity item : userEntity) {
				UserDTO dto = userConverter.toDTO(item);
				userDTO.add(dto);
			}
		}
		return userDTO;
	}

	@Override
	public List<UserDTO> findAllByCreatedDateBetween(Date startDate, Date endDate) {
		List<UserDTO> userDTO = new ArrayList<>();
		List<UserEntity> userEntity = userRepository.findAllByCreatedDateBetween(startDate, endDate);
		if(startDate != null && endDate != null) {
			for(UserEntity item : userEntity) {
				UserDTO dto = userConverter.toDTO(item);
				userDTO.add(dto);
			}
		}
		return userDTO;
	}

	@Override

	public UserDTO register(UserDTO userDto) {
		UserEntity newUserEntity = new UserEntity();
		if (userDto.getId() != null) { // update
			UserEntity oldUserEntity = userRepository.findUserById(userDto.getId()).get();
			newUserEntity = userConverter.toEntity(userDto, oldUserEntity);
		} else { // insert
			newUserEntity = userConverter.toEntity(userDto);
		}
		newUserEntity = userRepository.save(newUserEntity);
		return userConverter.toDTO(newUserEntity);
		
	}

	public UserDTO findById(Long id) {
		UserEntity userEntity=userRepository.findUserById(id).get();
		return  userConverter.toDTO(userEntity);
	}

	@Override
	public UserDTO findUserByUserName(String username) {
		UserEntity userEntity=userRepository.findUserByUserName(username).get();
		return  userConverter.toDTO(userEntity);
	}

	@Override
	public List<CommentDTO> getListCommentOfUser(String username) {
		List<CommentDTO> commentDTOS = new ArrayList<>();
		UserEntity userEntity=userRepository.findUserByUserName(username).get();
		for(CommentEntity item : userEntity.getCommentEntityList()) {
			CommentDTO dto = commentConverter.toDTO(item);
			commentDTOS.add(dto);
		}
		return commentDTOS;
	}

	@Override
	public List<UserDTO> findAllByStatus(Integer status) {
		List<UserDTO> userDTO = new ArrayList<>();
		List<UserEntity> userEntity = userRepository.findAllByStatus(status);
		for(UserEntity item : userEntity) {
			UserDTO dto = userConverter.toDTO(item);
			userDTO.add(dto);
		}
		return userDTO;

	}


	@Override
	public UserDTO login(String userName, String password) {
		UserDTO userDto = new UserDTO();
		UserEntity userEntity = userRepository.findUserByUserNameAndPassword(userName,password).get();
		if(userName != null && password != null && userEntity != null) {
			userDto = userConverter.toDTO(userEntity);
			return userDto;
		}
		return null;
		
	}

	@Override
	public UserDTO changPassword(UserDTO userDto) {
		UserEntity newUserEntity = new UserEntity();
		if(userDto.getId() != null) {
			UserEntity oldUserEntity = userRepository.findById(userDto.getId()).get();
			newUserEntity = userConverter.changePassword(userDto, oldUserEntity);
		}
		newUserEntity = userRepository.save(newUserEntity);
		return userConverter.toDTO(newUserEntity);
	}

	@Override
	public void delete(long[] ids) {
		// TODO Auto-generated method stub
		
	}
}
