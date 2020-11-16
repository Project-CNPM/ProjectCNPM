package com.javaweb.newswebsite.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.newswebsite.dto.CmtChildDTO;
import com.javaweb.newswebsite.entity.CommentChildEntity;
import com.javaweb.newswebsite.repo.CmtRepository;

@Component
public class CmtChildConverter {
	
	@Autowired
	CmtRepository cmtRepo;
	public CommentChildEntity toEntity(CmtChildDTO dto) {
		CommentChildEntity entity = new CommentChildEntity();
		entity.setContent(dto.getContent());
		entity.setStatus(dto.getStatus());
		return entity;
	}
	
	public CmtChildDTO toDTO(CommentChildEntity entity) {
		CmtChildDTO dto = new CmtChildDTO();
		if (entity.getId() != null) {
            dto.setId(entity.getId());
        }
		dto.setContent(entity.getContent());
		dto.setStatus(entity.getStatus());
		dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setModifiedBy(entity.getModifiedBy());
		return dto;
	}
	
	public CommentChildEntity toEntity(CmtChildDTO dto, CommentChildEntity entity) {
		entity.setContent(dto.getContent());
		entity.setStatus(dto.getStatus());
		return entity;
	}
}
