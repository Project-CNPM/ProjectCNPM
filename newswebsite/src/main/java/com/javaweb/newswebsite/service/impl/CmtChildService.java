package com.javaweb.newswebsite.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.newswebsite.converter.CmtChildConverter;
import com.javaweb.newswebsite.dto.CmtChildDTO;
import com.javaweb.newswebsite.entity.CommentChildEntity;
import com.javaweb.newswebsite.entity.CommentEntity;
import com.javaweb.newswebsite.repo.CmtChildRepository;
import com.javaweb.newswebsite.repo.CmtRepository;
import com.javaweb.newswebsite.service.ICmtChildService;
@Service
public class CmtChildService implements ICmtChildService{
	@Autowired
	private CmtChildRepository cmtChildRepository;
	
	@Autowired
	private CmtRepository cmtRepository;
	
	@Autowired
	private CmtChildConverter cmtChildConverter;
	
	@Override
	public CmtChildDTO save(CmtChildDTO dto) {
		CommentEntity commententities = cmtRepository.findCommentById(dto.getCommentId()).get();
        CommentChildEntity newCmtChildEntity = new CommentChildEntity();
        if(dto.getId() !=null){
            CommentChildEntity oldCmtChildEntity = cmtChildRepository.findCommentById(dto.getId()).get();
            newCmtChildEntity = cmtChildConverter.toEntity(dto, oldCmtChildEntity);
        }else {
            newCmtChildEntity = cmtChildConverter.toEntity(dto);
            newCmtChildEntity.setCommentEntity(commententities);
        }
        newCmtChildEntity = cmtChildRepository.save(newCmtChildEntity);
        return cmtChildConverter.toDTO(newCmtChildEntity);
    }
	
	@Override
	public void delete(long[] ids) {
		for (long items : ids) {
			cmtChildRepository.deleteById(items);
		}		
	}
}
