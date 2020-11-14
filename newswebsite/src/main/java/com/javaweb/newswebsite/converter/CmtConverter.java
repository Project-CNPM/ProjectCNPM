package com.javaweb.newswebsite.converter;


//import java.util.ArrayList;
//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.newswebsite.dto.CmtDTO;
//import com.javaweb.newswebsite.dto.NewDTO;
import com.javaweb.newswebsite.entity.CommentEntity;
//import com.javaweb.newswebsite.entity.NewEntity;
import com.javaweb.newswebsite.repo.NewRepository;

@Component
public class CmtConverter {
	
	@Autowired
	NewRepository newRepo;
	public CommentEntity toEntity(CmtDTO dto) {
		CommentEntity entity = new CommentEntity();
		entity.setContent(dto.getContent());
		entity.setStatus(dto.getStatus());
		
		//List<NewEntity> entities = new ArrayList<NewEntity>();
		//NewEntity newEntity = new NewEntity();
		//entity.setNewEntity(newRepo.findById(newEntity.getId()).get());
		return entity;
	}
	
	public CmtDTO toDTO(CommentEntity entity) {
		CmtDTO dto = new CmtDTO();
		if (entity.getId() != null) {
            dto.setId(entity.getId());
        }
		dto.setContent(entity.getContent());
		dto.setStatus(entity.getStatus());
		dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setModifiedBy(entity.getModifiedBy());
       // dto.setNewId(entity.getNewEntity());
//        List<NewDTO> newdto = new ArrayList<NewDTO>();
//        for(NewEntity newentity : entity.get)
		return dto;
	}
	
	public CommentEntity toEntity(CmtDTO dto, CommentEntity entity) {
		entity.setContent(dto.getContent());
		entity.setStatus(dto.getStatus());
		return entity;
	}
}
