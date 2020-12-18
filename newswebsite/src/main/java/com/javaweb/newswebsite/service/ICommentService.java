package com.javaweb.newswebsite.service;

import java.util.List;

import com.javaweb.newswebsite.dto.UserDTO;
import org.springframework.data.domain.Pageable;

import com.javaweb.newswebsite.dto.CommentDTO;

public interface ICommentService {
	CommentDTO save(CommentDTO commentDto);
	void delete(Long[] ids);
	List<CommentDTO> findAll(Pageable pageable);
	CommentDTO findById(Long id);
	List<CommentDTO> findAllByNewIdAndStatus(Long id,Integer status);
	List<CommentDTO> findAllByStatus(Pageable pageable,Integer status);
	List<CommentDTO> findAllByStatus(Integer status);

}
