package com.javaweb.newswebsite.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.javaweb.newswebsite.converter.CmtConverter;
import com.javaweb.newswebsite.dto.CmtDTO;
import com.javaweb.newswebsite.entity.CommentEntity;
import com.javaweb.newswebsite.entity.NewEntity;
import com.javaweb.newswebsite.repo.CmtRepository;
import com.javaweb.newswebsite.repo.NewRepository;
import com.javaweb.newswebsite.service.ICmtService;

@Service
public class CmtService implements ICmtService {
	@Autowired
	private CmtRepository cmtRepository;

	@Autowired
	private NewRepository newRepository;

	@Autowired
	private CmtConverter cmtConverter;

	@Override
	public CmtDTO save(CmtDTO dto) {
		NewEntity newentities = newRepository.findNewById(dto.getNewId()).get();
		CommentEntity newCmtEntity = new CommentEntity();
		if (dto.getId() != null) {
			CommentEntity oldCmtEntity = cmtRepository.findCommentById(dto.getId()).get();
			newCmtEntity = cmtConverter.toEntity(dto, oldCmtEntity);
		} else {
			newCmtEntity = cmtConverter.toEntity(dto);
			newCmtEntity.setNewEntity(newentities);
		}

		newCmtEntity = cmtRepository.save(newCmtEntity);
		return cmtConverter.toDTO(newCmtEntity);
	}

	@Override
	public void delete(long[] ids) {
		for (long items : ids) {
			cmtRepository.deleteById(items);
		}
	}

	@Override
	public CmtDTO findById(Long id) {
		CommentEntity entity = cmtRepository.findCommentById(id).get();
		return cmtConverter.toDTO(entity);
	}

	@Override
	public List<CmtDTO> findAll(Pageable pageable) {
		List<CmtDTO> cmtDTO = new ArrayList<>();
		List<CommentEntity> cmtEntity = cmtRepository.findAll(pageable).getContent();
		for (CommentEntity item : cmtEntity) {
			CmtDTO dto = cmtConverter.toDTO(item);
			cmtDTO.add(dto);
		}
		return cmtDTO;
	}

	@Override
	public int totalUser() {
		return (int) cmtRepository.count();
	}

	@Override
	public List<CmtDTO> findByKeyWord(String keyword, Pageable pageable) {
		List<CmtDTO> cmtDTO = new ArrayList<>();
		List<CommentEntity> cmtEntity = cmtRepository.search(keyword, pageable);
		if (keyword != null) {
			for (CommentEntity item : cmtEntity) {
				CmtDTO dto = cmtConverter.toDTO(item);
				cmtDTO.add(dto);
			}
		}
		return cmtDTO;
	}
}
