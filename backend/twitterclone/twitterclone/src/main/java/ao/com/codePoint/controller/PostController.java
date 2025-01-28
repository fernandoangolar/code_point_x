package ao.com.codePoint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ao.com.codePoint.model.Post;
import ao.com.codePoint.repository.PostRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;
    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAllByOrderByCreatedAtDesc());
    }
    
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        if (post.getContent().length() > 280) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(postRepository.save(post));
    }
    
    @PutMapping("/{id}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long id) {
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setLikes(post.getLikes() + 1);
        return ResponseEntity.ok(postRepository.save(post));
    }
    
    @PutMapping("/{id}/unlike")
    public ResponseEntity<Post> unlikePost(@PathVariable Long id) {
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        if (post.getLikes() > 0) {
            post.setLikes(post.getLikes() - 1);
        }
        return ResponseEntity.ok(postRepository.save(post));
    }
    
}
