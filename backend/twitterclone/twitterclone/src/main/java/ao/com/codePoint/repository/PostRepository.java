package ao.com.codePoint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ao.com.codePoint.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{

    List<Post> findAllByOrderByCreatedAtDesc();
    
}
